import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";

export default function Home({ user, projects }) {
  return (
    <Container user={user}>
      <div className="flex flex-col justify-center items-start max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Hey, I’m {user.first_name} {user.last_name}
        </h1>
        <h2 className="prose text-gray-600 dark:text-gray-400">
          {user.tagline}
        </h2>
        <h3 className="font-bold text-2xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Projects
        </h3>
        {projects.map((project) => (
          <ProjectCard project={project} />
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
  const projects_fetch = await fetch(
    "https://app.hyperlog.io/data_api/projects",
    {
      headers: {
        "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
      },
    }
  );

  const user = await user_fetch.json();
  const projects = await projects_fetch.json();

  return {
    props: {
      user,
      projects,
    },
  };
}
