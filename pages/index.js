import Link from "next/link";

import { useUserSocial, useUser, useAllRepos } from "@hyperlog/hooks";

import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();
  const { repos, isLoading: isRepoLoading } = useAllRepos();

  const repoImage = (repo) => {
    let repo_owner = repo.substr(0, repo.indexOf("/"));
    return `https://github.com/${repo_owner}.png`;
  };

  if (!isUserLoading && !isRepoLoading) {
    console.log(user);
    return (
      <Container title={user.first_name + " " + user.last_name} description={user.tagline}>
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Hey, I’m {user.first_name} {user.last_name}
          </h1>
          <h2 className="prose text-gray-600 dark:text-gray-400 mb-16">
            {user.tagline}
          </h2>
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
            Projects
          </h3>
          {repos.map((repo) => (
            <ProjectCard
              title={repo.repo_full_name}
              description={repo.description}
              href={repo.external_url}
              icon={repoImage(repo.repo_full_name)}
            />
          ))}
        </div>
      </Container>
    );
  } else {
    return <></>;
  }
}
