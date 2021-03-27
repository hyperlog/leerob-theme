import Container from "../components/Container";

const About = ({ user }) => {
  return (
    <Container user={user}>
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
};

export async function getServerSideProps() {
  const user_fetch = await fetch("https://app.hyperlog.io/data_api/user_info", {
    headers: {
      "x-portfolio-user-id": process.env.HYPERLOG_USER_ID,
    },
  });

  const user = await user_fetch.json();

  return {
    props: {
      user,
    },
  };
}

export default About;
