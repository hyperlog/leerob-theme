import Container from "../../components/Container";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"));

export default function Project({ project, user }) {
  return (
    <Container user={user}>
      <div className="flex flex-col justify-center items-start max-w-2xl w-full mx-auto mb-16">
        <img src={project.image_url} className="w-full rounded mb-10 shadow" />
        <h1 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          {project.name}
        </h1>
        <h2 className="prose text-gray-600 dark:text-gray-400">
          {project.tagline}
        </h2>
        <p className="prose tracking-tight mb-4 mt-8 text-black dark:text-white">
          {project.description}
        </p>
        <div class="relative w-full mb-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300 dark:border-gray-800"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-white text-lg font-medium text-gray-900 dark:text-gray-100 dark:bg-gray-600 rounded-2xl">
              Repositories
            </span>
          </div>
        </div>

        {project.repos.map((repo) => (
          <a
            className="mb-4 hover:shadow w-full"
            target="_blank"
            href={repo.html_url}
            rel="noopener noreferrer"
          >
            <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded p-4">
              <div className="h-8 w-8 ml-2 mr-4">
                <span className="sr-only">{repo.full_name}</span>
                <img
                  className="h-8 w-8 min-w-sm rounded-full dark:bg-gray-100"
                  src={repo.image_url}
                />
              </div>
              <div>
                <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {repo.full_name}
                </h4>
                <p className="leading-5 text-gray-700 dark:text-gray-300">
                  {repo.description}
                </p>
              </div>
            </div>
          </a>
        ))}

        <div class="relative w-full mb-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300 dark:border-gray-800"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-white text-lg font-medium text-gray-900 dark:text-gray-100 dark:bg-gray-600 rounded-2xl">
              Tech Analysis
            </span>
          </div>
        </div>

        <div className="w-full">
          <ReactJson
            src={project.aggregated_tech_analysis}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
            style={{ padding: 15, borderRadius: 5 }}
            collapsed={2}
            theme="isotope"
          />
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  const user_fetch = await fetch("https://app.hyperlog.io/data_api/user_info", {
    headers: {
      "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
    },
  });
  const project_fetch = await fetch(
    "https://app.hyperlog.io/data_api/projects/" + params.slug,
    {
      headers: {
        "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
      },
    }
  );

  const user = await user_fetch.json();
  const project = await project_fetch.json();

  return {
    props: {
      project,
      user,
    },
  };
}
