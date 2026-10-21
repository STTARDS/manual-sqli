import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

// Sección de bienvenida (la parte grande de arriba).
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <span className={styles.badge}>Seguridad web · Ethical Hacking</span>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          ¿Qué es la inyección SQL, cómo funciona un ataque y cómo defenderse?
          Una guía paso a paso con Kali Linux, DVWA y sqlmap.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Comenzar la práctica →
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/payload-explicado">
            Ver el payload explicado 🔍
          </Link>
        </div>
      </div>
    </header>
  );
}

// Datos del curso y el equipo.
function CourseInfo() {
  return (
    <section className={styles.courseSection}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Heading as="h2">Información del curso</Heading>
            <table className={styles.courseTable}>
              <tbody>
                <tr>
                  <td><strong>Tema</strong></td>
                  <td>SQL Injection (Inyección SQL)</td>
                </tr>
                <tr>
                  <td><strong>Carrera</strong></td>
                  <td>Ingeniería en Sistemas</td>
                </tr>
                <tr>
                  <td><strong>Universidad</strong></td>
                  <td>Universidad Mariano Gálvez de Guatemala</td>
                </tr>
                <tr>
                  <td><strong>Sede</strong></td>
                  <td>Salamá, Baja Verapaz</td>
                </tr>
                <tr>
                  <td><strong>Fecha</strong></td>
                  <td>24 de octubre de 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col col--6">
            <Heading as="h2">Equipo</Heading>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>BM</div>
              <div>
                <strong>Bresler Avizaí Morales Gamez</strong>
                <div className={styles.carnet}>Carné 2490-22-13522</div>
              </div>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>AA</div>
              <div>
                <strong>Anderson Yahir Alvarado García</strong>
                <div className={styles.carnet}>Carné 2490-22-4378</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Práctica guiada de SQL Injection para Ingeniería en Sistemas - UMG Salamá">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CourseInfo />
      </main>
    </Layout>
  );
}
