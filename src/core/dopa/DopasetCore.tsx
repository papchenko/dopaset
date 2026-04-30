import { useState, useMemo } from "react";
import { useDopaset } from "./useDopaset";
import DopasetChart from "./DopasetChart";
import { calculateWeekly } from "./utils/weekly";
import { getAIAdvice } from "./utils/ai";
import dayjs from "dayjs";
import { FaCheck, FaFire, FaTrophy } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";

export default function DopasetCore() {
  const { base, userProfile, history, plan, stats, saveBase, saveDay } =
    useDopaset();
    
  const isAIEnabled =
    userProfile?.plan === "Dopaset Pro" ||
    userProfile?.plan === "Dopaset Ultra";

  const [form, setForm] = useState({
    phoneHours: "",
    socialHours: "",
  });

  const [doneReq, setDoneReq] = useState<string[]>([]);
  const [doneOpt, setDoneOpt] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");

  const todayDone = useMemo(
    () => history.some(d => d.date === today),
    [history]
  );

  // ✔ toggle tasks
  const toggle = (task: string, type: "req" | "opt") => {
    if (todayDone) return;

    if (type === "req") {
      setDoneReq(prev =>
        prev.includes(task)
          ? prev.filter(t => t !== task)
          : [...prev, task]
      );
    } else {
      setDoneOpt(prev =>
        prev.includes(task)
          ? prev.filter(t => t !== task)
          : [...prev, task]
      );
    }
  };

  // ✔ finish day
  const finishDay = async () => {
    if (todayDone) return;

    setLoading(true);

    const score = doneReq.length * 2 + doneOpt.length;

    await saveDay({
      requiredDone: doneReq,
      optionalDone: doneOpt,
      score,
    });

    setDoneReq([]);
    setDoneOpt([]);
    setLoading(false);
  };

  const weekly = calculateWeekly(history);
  const ai = getAIAdvice(history);

  const handleNumberInput = (value: string) => {
    if (/^\d{0,2}$/.test(value)) {
      return value;
    }
    return null;
  };

  return (
    <div className="pt-[80px]">
      <div className="min-h-screen bg-black text-white p-10">

        {/* 🔥 STATS text-purple-300 */}
        <div className="flex gap-6 text-[#586ba4] mb-6">
          <div><FaFire /> {stats.streak}</div>
          <div><FaBoltLightning /> {stats.xp}</div>
          <div><FaTrophy /> Lv {stats.level}</div>
        </div>

        {/* BASE FORM */}
        {!base && (
          <form
            onSubmit={e => {
              e.preventDefault();
              saveBase({
                phoneHours: Number(form.phoneHours),
                socialHours: Number(form.socialHours),
              });
            }}
            className="flex flex-col gap-3 max-w-md"
          >
            <input
              placeholder="Phone hours"
              value={form.phoneHours}
              onChange={e => {
                const val = handleNumberInput(e.target.value);
                if (val !== null) {
                  setForm({ ...form, phoneHours: val });
                }
              }}
              className="p-2 bg-zinc-900"
            />

            <input
              placeholder="Social hours"
              value={form.socialHours}
              onChange={e => {
                const val = handleNumberInput(e.target.value);
                if (val !== null) {
                  setForm({ ...form, socialHours: val });
                }
              }}
              className="p-2 bg-zinc-900"
            />

            <button className="bg-[#586ba4] p-2">
              Start
            </button>
          </form>
        )}

        {/* MAIN APP */}
        {base && (
          <>
            {todayDone && (
              <div className="text-green-400 mb-4 flex gap-2 items-center">
                Day completed <FaCheck />
              </div>
            )}

            {/* REQUIRED */}
            <h2 className="mt-6">Required</h2>
            {plan.required.map((t: string) => (
              <div
                key={t}
                onClick={() => toggle(t, "req")}
                className={`p-2 mb-2 cursor-pointer border ${
                  doneReq.includes(t)
                    ? "bg-green-400/20 border-green-400"
                    : "bg-zinc-900 border-zinc-700"
                }`}
              >
                {t}
              </div>
            ))}

            {/* OPTIONAL */}
            <h2 className="mt-6">Optional</h2>
            {plan.optional.map((t: string) => (
              <div
                key={t}
                onClick={() => toggle(t, "opt")}
                className={`p-2 mb-2 cursor-pointer border ${
                  doneOpt.includes(t)
                    ? "bg-blue-500/20 border-blue-500"
                    : "bg-zinc-900 border-zinc-700"
                }`}
              >
                {t}
              </div>
            ))}

            {/* FINISH */}
            <button
              onClick={finishDay}
              disabled={
                loading ||
                todayDone ||
                doneReq.length < plan.required.length
              }
              className="mt-4 bg-[#586ba4] p-2 disabled:opacity-50"
            >
              Finish Day
            </button>

            {/* CHART */}
            <div className="mt-6">
              <DopasetChart history={history} />
            </div>

            {/* WEEKLY */}
            <div className="mt-4">
              <p>Weekly avg: {weekly.avg.toFixed(2)}</p>
              <p>Total: {weekly.total}</p>
            </div>

            {/* AI Assistant SaaS */}
            <div className="mt-4 text-[#586ba4]">
              <p className="text-white/30">AI Assistant:</p>
              {isAIEnabled
                ? ai
                : "Upgrade to Dopaset Pro or Ultra to unlock AI Coach"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}