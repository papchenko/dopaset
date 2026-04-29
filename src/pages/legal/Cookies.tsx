import LegalLayout from "./LegalLayout";
import { legalConfig } from "./legal.config";

export default function Cookies() {
  return (
    <LegalLayout title="Cookie Policy">

      <p className="text-gray-400">
        {legalConfig.appName} uses cookies.
      </p>

      <ul className="text-gray-400 list-disc pl-6 mt-4">
        {legalConfig.cookies.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

    </LegalLayout>
  );
}