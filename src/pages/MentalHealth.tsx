
import { Helmet } from "react-helmet";
import ChatBot from "@/components/mental-health/ChatBot";

const MentalHealth = () => {
  return (
    <div>
      <Helmet>
        <title>Mental Health Assistant | Urban Health Portal</title>
        <meta name="description" content="AI-powered mental health support and resources for Mumbai residents." />
      </Helmet>
      
      <ChatBot />
    </div>
  );
};

export default MentalHealth;
