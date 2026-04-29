import LegalLayout from "./LegalLayout";
import { legalConfig } from "./legal.config";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy">

      <p className="text-gray-400">
        {legalConfig.appName} is designed to help users control digital habits.
        We only collect data necessary for this purpose.
      </p>

      <h2 className="text-xl font-semibold mt-6">Data We Collect</h2>
      <ul className="text-gray-400 list-disc pl-6">
        {legalConfig.dataCollected.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Usage</h2>
      <p className="text-gray-400">
        Data is used strictly for analytics and improving user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6">Contact</h2>
      <p className="text-gray-400">{legalConfig.email}</p>

    </LegalLayout>
  );
}