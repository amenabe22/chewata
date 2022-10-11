import { isAuthed } from "../decorators";
import { Category, Community } from "../entity/Community";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { CommunityInputType } from "../inputs";
import { slugifyTitle, userCreatedCommunities } from "../utils/core";
import { AppDataSource } from "../data-source";
import { Not } from "typeorm";

@Resolver(Community)
export class CommunityResolver {
  @Query(() => [Community], { nullable: true })
  @UseMiddleware(isAuthed)
  async userCommunities(@Ctx() { user }: MyContext): Promise<Community[]> {
    const communities = await AppDataSource.manager.find(Community, {
      where: {
        user: { id: user.id },
      },
    });
    return communities;
  }

  @Query(() => Community, { nullable: true })
  async community(@Arg("title") title: string): Promise<Community | null> {
    const community = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(title),
      },
    });
    return community.length ? community[0] : null;
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
        slug: slugifyTitle(title as string),
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
      slug: slugifyTitle(title),
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
      name: desc,
      slug: slugifyTitle(desc),
    });
    return true;
  }

  @Query(() => [Category])
  @UseMiddleware(isAuthed)
  async updateCover(): Promise<Category[]> {
    return await AppDataSource.manager.find(Category);
  }

  @Query(() => [Category])
  @UseMiddleware(isAuthed)
  async updateLogo(): Promise<Category[]> {
    return await AppDataSource.manager.find(Category);
  }

  @Query(() => [Category])
  @UseMiddleware(isAuthed)
  async categories(): Promise<Category[]> {
    return await AppDataSource.manager.find(Category);
  }

  @Mutation(() => Community)
  @UseMiddleware(isAuthed)
  async addCommunity(
    @Ctx() { user }: MyContext,
    @Arg("input") input: CommunityInputType
  ): Promise<Community> {
    const maxCommunityLimit = 10;
    const userCommunities = await userCreatedCommunities(user);
    if (userCommunities.length >= maxCommunityLimit) {
      throw Error(`can't create more than ${maxCommunityLimit} communities`);
    }

    const allowedTypes = ["public", "private"];
    if (!allowedTypes.includes(input.type)) {
      throw Error("invalid input");
    }
    const communityQry = await AppDataSource.manager.find(Community, {
      where: {
        slug: slugifyTitle(input.name as string),
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
    console.log(category, "whoa");
    if (!category.length) {
      throw Error("category not found");
    }
    const community = await AppDataSource.manager.save(Community, {
      name: input.name,
      slug: slugifyTitle(input.name as string),
      description: input.description,
      type: input.type,
      user: user,
      category: category[0],
    });
    return community;
  }
}
