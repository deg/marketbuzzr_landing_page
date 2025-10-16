import React from "react";
import SectionTitle from "./SectionTitle";
import FeatureCard from "./FeatureCard";

const FEATURES_DATA = [
  {
    heading: "Competitor Blog Posts",
    description:
      "Analyze competitor content to detect themes, gaps, and opportunities. Our AI automates the monitoring and surfaces what matters.",
    actionText: "Start tracking competitor blog posts",
  },
  {
    heading: "Webinars",
    description:
      "Follow industry leaders, topics, and key takeaways in real-time to inform GTM and positioning decisions.",
    actionText: "Start tracking industry webinars",
  },
  {
    heading: "Podcasts",
    description:
      "Capture expert opinions, pain points, and evolving narratives from industry podcasts — summarized for quick review.",
    actionText: "Start tracking industry podcasts",
  },
  {
    heading: "Social Posts",
    description:
      "Monitor LinkedIn and other channels to see what leaders are saying, trending concerns, and shifting industry priorities.",
    actionText: "Start tracking social posts",
  },
];

const Features = () => (
  <section className="section container" id="features">
    <SectionTitle
      title="Track all relevant market activities"
      lead="Never miss out on competitor activities and market trends"
    />
    <div className="grid">
      {FEATURES_DATA.map((feature, index) => (
        <FeatureCard key={index} feature={feature} index={index} />
      ))}
    </div>
  </section>
);

export default Features;
