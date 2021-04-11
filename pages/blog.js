import Link from "next/link";
import Container from "../components/Container";

export default function Blog({ user, blogs }) {
  return (
    <Container user={user}>
      <div className="flex flex-col justify-center items-start max-w-2xl w-full mx-auto mb-16">
        <h3 className="font-bold text-2xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Blog Posts
        </h3>
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.slug}`}>
            <a className="w-full">
              <div className="mb-8 w-full">
                <div className="flex flex-col md:flex-row justify-between">
                  <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
                    {blog.title}
                  </h4>
                  <p className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
                    {blog.readable_publish_date}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {blog.description}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const user_fetch = await fetch("https://app.hyperlog.io/data_api/user_info", {
    headers: {
      "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
    },
  });

  const blogs_fetch = await fetch("https://app.hyperlog.io/data_api/blogs", {
    headers: {
      "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
    },
  });

  const user = await user_fetch.json();
  const blogs = await blogs_fetch.json();

  return {
    props: {
      user,
      blogs,
    },
  };
}
