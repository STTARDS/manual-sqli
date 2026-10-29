import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Las tres tarjetas que resumen la práctica.
const FeatureList = [
  {
    icon: '01',
    title: '¿Qué es SQL Injection?',
    description: (
      <>
        Una vulnerabilidad que permite inyectar código SQL malicioso en las
        consultas de una aplicación. Aquí se explica de forma sencilla, con
        ejemplos como <code>' OR '1'='1</code> desglosados pieza por pieza.
      </>
    ),
  },
  {
    icon: '02',
    title: '¿Cómo se explota?',
    description: (
      <>
        Práctica real en <strong>Kali Linux</strong> con DVWA y sqlmap. Paso a
        paso, desde preparar DVWA hasta extraer datos de una base de datos
        vulnerable.
      </>
    ),
  },
  {
    icon: '03',
    title: '¿Cómo se previene?',
    description: (
      <>
        Consultas parametrizadas, validación de datos y buenas prácticas. La
        parte más importante: entender por qué ocurre para poder defenderse.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.card}>
        <div className={styles.icon}>{icon}</div>
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
