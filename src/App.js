import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Joyride, { STATUS } from 'react-joyride';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { useGlobalState, useGlobalDispatch } from './context/GlobalState';

const steps = [
  {
    target: '.home-link',
    content: 'This is the home page link',
    route: '/',
  },
  {
    target: '.about-link',
    content: 'This is the about page link',
    route: '/about',
  },
  {
    target: '.contact-link',
    content: 'This is the contact page link',
    route: '/contact',
  },
  {
    target: '#home-tag',
    content: 'This is the home tag',
    route: '/',
  },
  {
    target: '.about-tag',
    content: 'This is the about tag',
    route: '/about',
  },
  {
    target: '.contact-tag',
    content: 'This is the contact tag',
    route: '/contact',
  },
];


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const globalState = useGlobalState();
  const globalDispatch = useGlobalDispatch();

  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = React.useState(0);

  const handleJoyrideCallback = (data) => {
    const { status, index, action, type } = data;
  
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      globalDispatch({ type: 'SET_TOUR_ACTIVE', payload: false });
    }
  
    if (type === 'step:after' && (action === 'next' || action === 'prev')) {
      setTimeout(() => {
        setStepIndex(index + (action === 'next' ? 1 : -1));
      }, 100);
    }
  };

  // Detecta mudanças no stepIndex e navega para a rota correta
  React.useEffect(() => {
    if (globalState.isTourActive && stepIndex < steps.length) {
      navigate(steps[stepIndex].route);
    }
  }, [stepIndex, globalState.isTourActive, navigate]);


  return (
    <>
      <Joyride
        steps={steps}
        run={globalState.isTourActive}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous={true}
      />

      <nav>
        <ul>
          <li>
            <Link className="home-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="about-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="contact-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <button
        onClick={() =>
          globalDispatch({ type: 'SET_TOUR_ACTIVE', payload: true })
        }
      >
        Start Tour
      </button>
    </>
  );
}

export default App;
