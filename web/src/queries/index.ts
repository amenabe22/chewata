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
      userId
      fullName
      email
      photo
      totalLikes
      createdAt
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


export const TOP_TAGS = gql`query {
  topTags {
    id
    tagName
  }
}
`

export const UPDATE_PROFILE = gql`mutation updateProfileBasic($name: String!, $bio: String) {
  updateProfileBasic(name: $name, bio: $bio)
}
`

export const IS_DUPLICATE = gql`mutation isNameDuplicate($name: String!) {
  isNameDuplicate(name: $name)
}
`