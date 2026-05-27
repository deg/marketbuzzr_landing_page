import React from "react";
import { home } from "../content/home";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import ProblemList from "../components/ProblemList";
import CtaPanel from "../components/CtaPanel";

const Home = () => {
  useDocumentTitle(home.title);
  return (
    <>
      <PageHero {...home.hero} />

      <section className="section container">
        <SectionTitle title={home.offerings.title} lead={home.offerings.lead} />
        <div className="grid">
          {home.offerings.items.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </section>

      <ProblemList {...home.problems} />

      <section className="section container home-closing">
        <CtaPanel {...home.closing} />
      </section>
    </>
  );
};

export default Home;
