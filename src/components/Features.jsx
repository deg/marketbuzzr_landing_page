import React from "react";
import SectionTitle from "./SectionTitle";
import FeatureCard from "./FeatureCard";

const FEATURES_DATA = [
  {
    heading: "Competitor Blog Posts",
    description:
      "Tracking competitor blog posts helps businesses stay ahead by identifying " +
      "trending topics, content gaps, and emerging industry themes. By analyzing " +
      "competitor content strategies, companies can refine their own messaging, " +
      "create more impactful content, and enhance SEO performance. Our AI-powered " +
      "platform automates this process, delivering real-time insights to ensure " +
      "your content remains competitive and relevant.",
    actionText: "Start tracking competitor blog posts",
  },
  {
    heading: "Webinars",
    description:
      "Tracking webinars provides valuable insights into industry trends, thought " +
      "leadership, and competitor positioning in real-time. By analyzing the topics, " +
      "speakers, and key takeaways, businesses can uncover emerging opportunities, " +
      "refine their go-to-market strategy, and align their messaging with industry " +
      "conversations. Our AI-driven platform ensures you never miss critical " +
      "discussions, helping you stay informed and ahead of the competition.",
    actionText: "Start tracking industry webinars",
  },
  {
    heading: "Podcasts",
    description:
      "Tracking podcasts offers a unique window into expert opinions, industry " +
      "narratives, and competitor strategies that might not be captured in written " +
      "content. By analyzing discussions from key industry voices, businesses can " +
      "gain deeper insights into market shifts, customer pain points, and innovative " +
      "ideas. Our AI-powered platform helps you stay connected to these " +
      "conversations, ensuring you leverage the latest insights to refine your " +
      "strategy.",
    actionText: "Start tracking industry podcasts",
  },
  {
    heading: "Social Posts",
    description:
      "Tracking social posts from industry leaders provides real-time insights " +
      "into market sentiment, emerging trends, and competitor engagement strategies. " +
      "These posts often reveal thought leadership perspectives, customer pain " +
      "points, and shifting industry priorities before they appear in formal " +
      "reports. Our AI-powered platform continuously monitors these conversations, " +
      "helping businesses stay agile and proactively adapt their strategies.",
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
