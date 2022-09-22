import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPosts($input: PaginationInputType!) {
    getPosts(input: $input) {
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
      user {
        id
        fullName
        photo
        totalLikes
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
