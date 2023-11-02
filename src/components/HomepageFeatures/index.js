import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "快速上手",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>我们的软件设计简洁, 第一次使用也能很快上手~</>,
  },
  {
    title: "精美文档",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>我们提供丰富的说明文档, 让你专注于软件使用.</>,
  },
  {
    title: "更新维护",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>理论上来说, 我们会一直更新软件, 直到世界尽头.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
