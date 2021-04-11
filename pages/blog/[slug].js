import Container from "../../components/Container";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter
        style={materialOceanic}
        language={language}
        children={value}
      />
    );
  },
};

export default function Blog({ blog, user }) {
  console.log(user);
  return (
    <Container user={user}>
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
          <div className="flex items-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {user.first_name} {user.last_name} / {blog.readable_publish_date}
            </p>
          </div>
        </div>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white mt-2">
          {blog.title}
        </h1>
        <h3 className="text-gray-600 font-medium text-2xl tracking-tight">
          {blog.description}
        </h3>
        {blog.cover_image && <img className="my-5" src={blog.cover_image} />}
        <ReactMarkdown
          renderers={renderers}
          className="prose dark:prose-dark max-w-none w-full mt-5"
        >
          {blog.body_markdown}
        </ReactMarkdown>
      </article>
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  const user_fetch = await fetch("https://app.hyperlog.io/data_api/user_info", {
    headers: {
      "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
    },
  });
  const blog_fetch = await fetch(
    "https://app.hyperlog.io/data_api/blogs/" + params.slug,
    {
      headers: {
        "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
      },
    }
  );

  const user = await user_fetch.json();
  const blog = await blog_fetch.json();

  return {
    props: {
      blog,
      user,
    },
  };
}
