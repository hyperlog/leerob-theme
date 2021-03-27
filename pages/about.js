import { useUser } from "@hyperlog/hooks";
import Container from "../components/Container";

const About = () => {
  const { user, isLoading: isUserLoading } = useUser();

  if (!isUserLoading) {
    return (
      <Container
        title={user.first_name + " " + user.last_name}
        description={user.tagline}
      >
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Hey, I’m {user.first_name} {user.last_name}
          </h1>
          <p className="prose text-gray-600 dark:text-gray-400 mb-16">
            {user.about}
          </p>
        </div>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default About;
