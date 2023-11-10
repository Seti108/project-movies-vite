import { CTAButton } from "../components/CTAButton/CTAButton";

export const ErrorPage = () => {
  const btnTarget = "errorPage";
  const btnText = "Back to home";
  return (
    <section className="error-page">
      <h1>Something went wrong..</h1>
      <p>Page not found</p>
      <CTAButton btnTarget={btnTarget} btnText={btnText} />
    </section>
  );
};
