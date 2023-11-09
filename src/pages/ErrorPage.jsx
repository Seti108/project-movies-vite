import { CTAButton } from "../components/CTAButton/CTAButton";

export const ErrorPage = () => {
  const btnTarget = "errorPage";
  const btnText = "Back to home";
  return (
    <section className="error-page">
      <h1>404</h1>
      <p>Page not found</p>
      <CTAButton btnTarget={btnTarget} btnText={btnText} />
    </section>
  );
};
