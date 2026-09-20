'use client';
// RESPONSIBILITY: Renders the interactive BMI Calculator; validation and calculation stay in useLandingBmi.
import { Heart } from 'lucide-react';
import { useLandingBmi } from '@/app/landing/landing_components/LandingBmiCalc/useLandingBmi';

export default function LandingBmiCalc() {
  const { weight, setWeight, height, setHeight, bmiResult, inputError, calculateBMI } = useLandingBmi();

  return (
    <section id="bmi" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-card grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Fitness Tools</div>
            <h2 className="text-3xl sm:text-4xl font-black text-primary mb-4">
              Calculate Your <span className="text-primary">BMI</span>
            </h2>
            <p className="text-secondary mb-8 leading-relaxed">
              Body Mass Index (BMI) is a simple calculation using a person&apos;s height and weight. The formula is BMI = kg/m² where kg is weight in kilograms and m² is height in metres squared.
            </p>

            <form onSubmit={calculateBMI} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="landing-bmi-height" className="text-xs font-medium text-secondary block mb-2">Height (cm)</label>
                  <input
                    id="landing-bmi-height"
                    type="number"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    placeholder="e.g. 175"
                    min="0.1"
                    step="0.1"
                    inputMode="decimal"
                    aria-invalid={Boolean(inputError)}
                    aria-describedby={inputError ? 'landing-bmi-height-help landing-bmi-error' : 'landing-bmi-height-help'}
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                    required
                  />
                  <p id="landing-bmi-height-help" className="text-xs text-secondary mt-2">Enter your height in centimetres.</p>
                </div>
                <div>
                  <label htmlFor="landing-bmi-weight" className="text-xs font-medium text-secondary block mb-2">Weight (kg)</label>
                  <input
                    id="landing-bmi-weight"
                    type="number"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder="e.g. 70"
                    min="0.1"
                    step="0.1"
                    inputMode="decimal"
                    aria-invalid={Boolean(inputError)}
                    aria-describedby={inputError ? 'landing-bmi-weight-help landing-bmi-error' : 'landing-bmi-weight-help'}
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                    required
                  />
                  <p id="landing-bmi-weight-help" className="text-xs text-secondary mt-2">Enter your weight in kilograms.</p>
                </div>
              </div>

              {inputError && <p id="landing-bmi-error" role="alert" className="text-xs text-danger">{inputError}</p>}

              <button
                type="submit"
                className="w-full min-h-11 py-3 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Calculate BMI
              </button>
            </form>
          </div>

          <div className="bg-input border border-border rounded-xl p-8 text-center min-h-64 flex flex-col justify-center items-center">
            {bmiResult ? (
              <div className="motion-safe:animate-in fade-in zoom-in motion-safe:duration-slow">
                <h3 className="text-lg font-bold text-secondary mb-2">Your BMI is</h3>
                <div className={`text-6xl font-black mb-4 ${bmiResult.colorClass}`} aria-live="polite">{bmiResult.value}</div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary-subtle border border-border text-primary font-semibold mb-6">{bmiResult.status}</div>
                <p className="text-sm text-secondary">
                  {bmiResult.status === 'Underweight' && 'You should aim to build muscle mass. Check out our Weight Gain programs.'}
                  {bmiResult.status === 'Normal Weight' && 'Great job! Maintain your physique with our General Fitness plans.'}
                  {bmiResult.status === 'Overweight' && 'Time to burn some calories! Our Weight Loss and Cardio programs are perfect for you.'}
                  {bmiResult.status === 'Obese' && 'Let our Personal Trainers guide you safely towards a healthier lifestyle.'}
                </p>
              </div>
            ) : (
              <div className="text-secondary">
                <Heart size={40} strokeWidth={2} className="mx-auto mb-4 text-secondary" />
                <p>Enter your height and weight<br />to see your BMI result here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
