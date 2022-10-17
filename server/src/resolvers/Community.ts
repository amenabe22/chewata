import { isAuthed } from "../decorators";
import { Category, Community, CommunityMember } from "../entity/Community";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  CommunityPaginatedResponse,
  CommunityResponse,
  MyContext,
} from "../types";
import { CommunityInputType, PaginationInputType } from "../inputs";
import { slugifyTitle, userCreatedCommunities } from "../utils/core";
import { AppDataSource } from "../data-source";
import { Not } from "typeorm";
import { Post } from "../entity/Post";
import { paginator } from "../utils/paginator";
import { MAX_COMMUNITIES_LIMIT } from "../constants";

@Resolver(Community)
export class CommunityResolver {
  @Mutation(() => Boolean)
  async addCategory(@Arg("input") input: string) {
    const obj = AppDataSource.manager.create(Category, {
      name: input,
    });
    await AppDataSource.manager.save(obj);
    return true;
  }

  @Mutation(() => Boolean)
  async updateCategory(@Arg("input") input: string, @Arg("cat") cat: string) {
    const category = await AppDataSource.manager.find(Category, {
      where: {
        catId: cat,
      },
    });
    if (!category.length) {
      throw Error("category not found");
    }

    await AppDataSource.manager.update(Category, category[0].id, {
      name: input,
    });
    return true;
  }

  @Query(() => CommunityPaginatedResponse, { nullable: true })
  async topCommunities(
    @Arg("cat", { nullable: true }) cat: string,
    @Arg("pagination") pagination: PaginationInputType
  ): Promise<CommunityPaginatedResponse> {
    let posts: any;
    console.log(cat, "CAT");
    if (cat) {
      posts = await AppDataSource.manager
        .createQueryBuilder(Post, "post")
        .leftJoinAndSelect("post.tags", "tags")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.community", "community")
        .leftJoinAndSelect("community.category", "category")
        .where("category.catId = :catId", { catId: cat })
        .andWhere("post.community IS NOT NULL")
        .getMany();
    } else {
      posts = await AppDataSource.manager
        .createQueryBuilder(Post, "post")
        .leftJoinAndSelect("post.tags", "tags")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.community", "community")
        .leftJoinAndSelect("community.category", "community.category")
        .where("post.community IS NOT NULL")
        .getMany();
    }

    const arr = posts.map((c: any) => c.community);
    const result = Array.from(
      arr.reduce(
        (map: any, item: any) => (map.get(item.slug).count++, map),
        new Map(
          arr.map((o: any) => [o.slug, Object.assign({}, o, { count: 0 })])
        )
      ),
      ([_, o]: any) => o
    )
      .sort((a, b) => b.count - a.count)
      .map((o) => o);

    const response = paginator(result, pagination.page, pagination.pageSize);

    return response;
  }
  @Query(() => Boolean, { nullable: true })
  @UseMiddleware(isAuthed)
  async dupName(@Arg("input") input: string) {
    const communities = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(input),
      },
    });
    return communities.length;
  }

  @Query(() => [Community], { nullable: true })
  @UseMiddleware(isAuthed)
  async userCommunities(@Ctx() { user }: MyContext): Promise<Community[]> {
    let communities: any = [];
    communities = await AppDataSource.manager.find(Community, {
      where: {
        user: { id: user.id },
      },
    });
    const memberships = await AppDataSource.manager.find(CommunityMember, {
      where: {
        user: { id: user.id },
      },
    });
    communities = [...communities, ...memberships.map((m) => m.community)];
    return communities;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async leaveCommunity(
    @Ctx() { user }: MyContext,
    @Arg("input") input: string
  ) {
    const com = await AppDataSource.manager.find(Community, {
      where: { communityId: input },
    });
    if (!com.length) {
      throw Error("Invalid input");
    }
    const memberships = await AppDataSource.manager.find(CommunityMember, {
      where: {
        community: { id: com[0].id },
        user: { id: user.id },
      },
    });
    if (!memberships.length) {
      throw Error("User is not a member");
    }
    await AppDataSource.manager.delete(CommunityMember, memberships[0].id);
    return true;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async joinCommunity(@Ctx() { user }: MyContext, @Arg("input") input: string) {
    const com = await AppDataSource.manager.find(Community, {
      where: { communityId: input },
    });
    if (!com.length) {
      throw Error("Invalid input");
    }
    const memberships = await AppDataSource.manager.find(CommunityMember, {
      where: {
        community: { id: com[0].id },
        user: { id: user.id },
      },
    });
    if (memberships.length) {
      throw Error("User is already a member");
    }
    const comObj = AppDataSource.manager.create(CommunityMember, {
      user: user,
      community: com[0],
    });
    await AppDataSource.manager.save(CommunityMember, comObj);
    return true;
  }

  @Query(() => CommunityResponse, { nullable: true })
  async community(
    @Arg("title") title: string,
    @Ctx() { user }: MyContext
  ): Promise<CommunityResponse | null> {
    console.log(user, "USER");
    let membershipStat: any = {};
    const community = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(title.toLowerCase()),
      },
    });
    if (community.length) {
      if (!user) {
        membershipStat = { joined: false, stat: null };
      } else {
        // check if user is member
        const joinStat = await AppDataSource.manager.find(CommunityMember, {
          where: {
            user: { id: user.id },
            community: { id: community[0].id },
          },
        });
        // check if user is admin
        const adminStat = await AppDataSource.manager.find(Community, {
          where: {
            user: { id: user.id },
            id: community[0].id,
          },
        });
        if (adminStat.length) {
          membershipStat = {
            joined: true,
            stat: "admin",
          };
        } else {
          membershipStat = {
            joined: joinStat.length > 0,
            stat: joinStat.length > 0 ? joinStat[0].memberType : null,
          };
        }
      }
    }
    return community.length
      ? { community: community[0], stat: membershipStat }
      : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async updateTitle(
    @Arg("community") communityId: string,
    @Arg("title") title: string,
    @Ctx() { user }: MyContext
  ): Promise<Boolean> {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        communityId: communityId,
        user: { id: user.id },
      },
    });
    if (!community.length) {
      throw Error("Invlaid input");
    }
    const communityQry = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(title.toLowerCase() as string),
        communityId: Not(community[0].communityId),
      },
    });
    if (communityQry.length) {
      throw Error("duplicate name");
    }
    if (title === "") {
      throw Error("invalid input");
    }

    await AppDataSource.manager.update(Community, community[0].id, {
      name: title,
      slug: slugifyTitle(title.toLowerCase()),
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async updateDescription(
    @Arg("community") communityId: string,
    @Arg("desc") desc: string,
    @Ctx() { user }: MyContext
  ): Promise<Boolean> {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        communityId: communityId,
        user: { id: user.id },
      },
    });
    if (!community.length) {
      throw Error("Invlaid input");
    }

    await AppDataSource.manager.update(Community, community[0].id, {
      description: desc,
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async updateCover(
    @Arg("cover") cover: string,
    @Arg("input") input: string,
    @Ctx() { user }: MyContext
  ): Promise<Boolean> {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        user: { id: user.id },
        communityId: input,
      },
    });
    if (!community.length) {
      throw Error("invalid request");
    }
    await AppDataSource.manager.update(Community, community[0].id, {
      cover: cover,
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async updateLogo(
    @Arg("cover") cover: string,
    @Arg("input") input: string,
    @Ctx() { user }: MyContext
  ): Promise<Boolean> {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        user: { id: user.id },
        communityId: input,
      },
    });
    if (!community.length) {
      throw Error("invalid request");
    }
    await AppDataSource.manager.update(Community, community[0].id, {
      logo: cover,
    });
    return true;
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await AppDataSource.manager.find(Category);
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuthed)
  async userCommunitiesCount(@Ctx() { user }: MyContext): Promise<boolean> {
    const userCommunities = await userCreatedCommunities(user);
    return userCommunities.length >= MAX_COMMUNITIES_LIMIT;
  }
  @Mutation(() => Community)
  @UseMiddleware(isAuthed)
  async addCommunity(
    @Ctx() { user }: MyContext,
    @Arg("input") input: CommunityInputType
  ): Promise<Community> {
    const userCommunities = await userCreatedCommunities(user);
    if (userCommunities.length >= MAX_COMMUNITIES_LIMIT) {
      throw Error(
        `can't create more than ${MAX_COMMUNITIES_LIMIT} communities`
      );
    }

    const allowedTypes = ["public", "private"];
    if (!allowedTypes.includes(input.type)) {
      throw Error("invalid input");
    }
    const communityQry = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(input.name as string).toLowerCase(),
      },
    });
    if (communityQry.length) {
      throw Error("duplicate name");
    }
    // check community category
    const category = await AppDataSource.manager.find(Category, {
      where: {
        catId: input.category,
      },
    });
    if (!category.length) {
      throw Error("category not found");
    }
    const community = await AppDataSource.manager.save(Community, {
      name: input.name,
      slug: slugifyTitle(input.name as string).toLowerCase(),
      description: input.description,
      type: input.type,
      user: user,
      category: category[0],
    });
    return community;
  }
}
