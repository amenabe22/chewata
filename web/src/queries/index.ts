import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPosts($input: PaginationInputType!, $filter: String) {
    getPosts(input: $input, filter: $filter) {
      page
      per_page
      total
      data {
        id
        postId
        slug
        content
        cover
        likes
        comments
        community {
          id
          name
          logo
          slug
        }
        tags {
          id
          tagName
        }
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;

export const POST = gql`
  query getPost($post: String!) {
    getPost(post: $post) {
      id
      slug
      postId
      content
      cover
      likes
      community {
        id
        name
        slug
        communityId
        description
        logo
        cover
        type
        category {
          id
          name
        }
        createdAt
      }
      user {
        id
        userId
        fullName
        photo
        totalLikes
      }
      createdAt
    }
  }
`;

export const POST_COMMENTS = gql`
  query getPostComments($post: String!, $pagination: PaginationInputType!) {
    getPostComments(post: $post, pagination: $pagination) {
      page
      per_page
      total
      data {
        id
        commentId
        message
        isReply
        cover
        likes
        user {
          id
          userId
          fullName
          photo
          totalLikes
          createdAt
        }
        createdAt
      }
    }
  }
`;

export const SOCIAL_LOGIN = gql`
  mutation socialMediaLoginGoogle($input: String!) {
    socialMediaLoginGoogle(input: $input) {
      token
      user {
        id
        userId
        fullName
        email
        bio
        photo
        socialIdtoken
        totalLikes
      }
      errors {
        field
        message
      }
    }
  }
`;

export const SET_VOTE = gql`
  mutation setVote($input: VoteInputType!) {
    setVote(input: $input)
  }
`;

export const GET_POST_VOTES = gql`
  query getPostVote($post: String!) {
    getPostVote(post: $post) {
      vote
      voted
    }
  }
`;

export const GET_COMMENT_VOTES = gql`
  query getCommentVote($comment: String!) {
    getCommentVote(comment: $comment) {
      vote
      voted
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($input: PostInputType!) {
    addPost(input: $input) {
      id
      postId
      slug
      content
      cover
      likes
      comments
      user {
        id
        fullName
        photo
        totalLikes
      }
      tags {
        id
        tagName
      }
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput!) {
    addComment(input: $input) {
      id
      commentId
      message
      isReply
      cover
      likes
      user {
        id
        fullName
        photo
        totalLikes
        createdAt
      }
      createdAt
    }
  }
`;

export const ME = gql`
  query {
    me {
      user {
        id
        userId
        fullName
        email
        bio
        photo
        socialIdtoken
        totalLikes
        createdAt
      }
      notificationsCount
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const USER_PUBLIC = gql`
  query userPublic($user: String!) {
    userPublic(user: $user) {
      id
      userId
      fullName
      photo
      bio
      totalLikes
      createdAt
    }
  }
`;

export const USER_POSTS = gql`
  query userPosts($pagination: PaginationInputType!) {
    userPosts(pagination: $pagination) {
      page
      total
      total_pages
      data {
        id
        postId
        slug
        content
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;

export const USER_COMMENTS = gql`
  query userComments($pagination: PaginationInputType!) {
    userComments(pagination: $pagination) {
      page
      per_page
      total
      data {
        id
        post {
          postId
        }
        commentId
        message
        isReply
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
          createdAt
        }
        createdAt
      }
    }
  }
`;

export const USER_PUBLIC_POSTS = gql`
  query userPublicPosts($pagination: PaginationInputType!, $user: String!) {
    userPublicPosts(pagination: $pagination, user: $user) {
      page
      total
      total_pages
      data {
        id
        postId
        slug
        content
        cover
        likes
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;

export const USER_PUBLIC_COMMENTS = gql`
  query userPublicComments($pagination: PaginationInputType!, $user: String!) {
    userPublicComments(pagination: $pagination, user: $user) {
      page
      per_page
      total
      data {
        id
        commentId
        message
        isReply
        cover
        likes
        user {
          id
          userId
          fullName
          photo
          totalLikes
          createdAt
        }
        post {
          postId
        }
        createdAt
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($post: String!) {
    deletePost(post: $post)
  }
`;

export const UPDATE_PUSH_TOKEN = gql`
  mutation updateUserPushToken($token: String!) {
    updateUserPushToken(token: $token)
  }
`;

export const NOTIFICATIONS = gql`
  query notifications($pagination: PaginationInputType!) {
    notifications(pagination: $pagination) {
      page
      per_page
      total
      data {
        id
        notificationId
        notificationType
        message
        user {
          id
          fullName
        }
        target {
          id
          fullName
        }
        cover
        createdAt
        link
      }
    }
  }
`;

export const LATEST_NOTIFICATIONS = gql`
  {
    latestNotifications {
      id
      notificationId
      notificationType
      message
      user {
        id
        fullName
        photo
      }
      target {
        id
        fullName
      }
      cover
      createdAt
      link
    }
  }
`;

export const TOP_TAGS = gql`
  query {
    topTags {
      id
      tagName
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfileBasic($name: String!, $bio: String) {
    updateProfileBasic(name: $name, bio: $bio)
  }
`;

export const IS_DUPLICATE = gql`
  mutation isNameDuplicate($name: String!) {
    isNameDuplicate(name: $name)
  }
`;

export const TAG_POSTS = gql`
  query tagPostFilter($tag: String!, $input: PaginationInputType!) {
    tagPostFilter(tag: $tag, input: $input) {
      page
      data {
        id
        postId
        slug
        content
        cover
        likes
        comments
        community {
          id
          name
          slug
          communityId
          description
          logo
          cover
          type
          category {
            id
            name
          }
          createdAt
        }
        tags {
          id
          tagName
        }
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;

export const NOTIFICATION_LISTENER = gql`
  subscription {
    notificationAdded {
      notification {
        id
        notificationId
        notificationType
        message
        user {
          id
          fullName
        }
        target {
          id
          fullName
        }
        cover
        createdAt
        link
      }
    }
  }
`;

export const ADD_COMMUNITY = gql`
  mutation addCommunity($input: CommunityInputType!) {
    addCommunity(input: $input) {
      id
      name
      communityId
      description
      logo
      slug
      cover
      type
      category {
        id
        name
      }
      createdAt
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories {
      id
      catId
      name
    }
  }
`;

export const COMMUNITY_POSTS = gql`
  query communityPosts($pagination: PaginationInputType!, $title: String!) {
    communityPosts(pagination: $pagination, title: $title) {
      page
      per_page
      total
      data {
        id
        postId
        slug
        content
        cover
        likes
        comments
        community {
          id
          name
          slug
          communityId
          description
          logo
          cover
          type
          category {
            id
            name
          }
          createdAt
        }
        tags {
          id
          tagName
        }
        user {
          id
          fullName
          photo
          totalLikes
        }
        createdAt
      }
    }
  }
`;

export const COMMUNITY = gql`
  query community($title: String!) {
    community(title: $title) {
      community {
        id
        name
        slug
        communityId
        description
        logo
        cover
        type
        category {
          id
          name
        }
        createdAt
      }
      stat {
        joined
        stat
      }
    }
  }
`;

export const USER_COMMUNITIES = gql`
  query {
    userCommunities {
      id
      name
      slug
      communityId
      description
      logo
      cover
      type
      category {
        id
        name
      }
      createdAt
    }
  }
`;

export const JOIN_COMMUNITY = gql`
  mutation joinCommunity($input: String!) {
    joinCommunity(input: $input)
  }
`;

export const LEAVE_COMMUNITY = gql`
  mutation leaveCommunity($input: String!) {
    leaveCommunity(input: $input)
  }
`;

export const TOP_COMMUNITIES = gql`
  query topCommunities($pagination: PaginationInputType!, $cat: String) {
    topCommunities(pagination: $pagination, cat: $cat) {
      data {
        id
        name
        slug
        logo
        category {
          id
          name
          catId
          createdAt
        }
      }
    }
  }
`;
export const UPDATE_COVER = gql`
  mutation updateCover($input: String!, $cover: String!) {
    updateCover(input: $input, cover: $cover)
  }
`;

export const UPDATE_LOGO = gql`
  mutation updateLogo($input: String!, $cover: String!) {
    updateLogo(input: $input, cover: $cover)
  }
`;

export const UPDATE_DESC = gql`
  mutation updateDescription($desc: String!, $community: String!) {
    updateDescription(desc: $desc, community: $community)
  }
`;


export const USER_COM_LIMIT = gql`query {
  userCommunitiesCount
}
`

export const DUPC_NAME = gql`query dupName($input: String!) {
  dupName(input: $input)
}
`