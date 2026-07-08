"use client";

import { Heart } from 'lucide-react';
import { useLandingContext } from '../../landing_context/LandingContext';

export default function LandingBmiCalc() {
  const { weight, setWeight, height, setHeight, bmiResult, calculateBMI } = useLandingContext();

  return (
    <section id="bmi" className="py-24 px-4 bg-gradient-to-b from-[var(--landing-bg-dark)] to-[var(--landing-bg-darker)]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[var(--landing-bg-card)] border border-[var(--landing-border)] rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-5">
              Fitness Tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Calculate Your <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>BMI</span>
            </h2>
            <p className="text-[var(--landing-text-secondary)] mb-8 leading-relaxed">
              Body Mass Index (BMI) is a simple calculation using a person&apos;s height and weight. The formula is BMI = kg/m2 where kg is a person&apos;s weight in kilograms and m2 is their height in metres squared.
            </p>
            
            <form onSubmit={calculateBMI} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--landing-text-secondary)] block mb-2">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={e => setHeight(e.target.value)} 
                    placeholder="e.g. 175" 
                    className="w-full bg-[var(--landing-bg-input)] border border-[var(--landing-border)] rounded-xl px-4 py-3 text-white placeholder-[var(--landing-text-muted)] focus:outline-none focus:border-orange-500 transition-colors" 
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--landing-text-secondary)] block mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight} 
                    onChange={e => setWeight(e.target.value)} 
                    placeholder="e.g. 70" 
                    className="w-full bg-[var(--landing-bg-input)] border border-[var(--landing-border)] rounded-xl px-4 py-3 text-white placeholder-[var(--landing-text-muted)] focus:outline-none focus:border-orange-500 transition-colors" 
                    required 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02]" 
                style={{ background: 'var(--landing-highlight-gradient)' }}
              >
                Calculate BMI
              </button>
            </form>
          </div>

          <div className="bg-[var(--landing-bg-input)] border border-[var(--landing-border)] rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center">
            {bmiResult ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <h3 className="text-lg font-bold text-gray-300 mb-2">Your BMI is</h3>
                <div className={`text-6xl font-black mb-4 ${bmiResult.color}`}>{bmiResult.value}</div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-[var(--landing-border)] text-white font-semibold mb-6">
                  {bmiResult.status}
                </div>
                <p className="text-sm text-[var(--landing-text-secondary)]">
                  {bmiResult.status === 'Underweight' && 'You should aim to build muscle mass. Check out our Weight Gain programs.'}
                  {bmiResult.status === 'Normal Weight' && 'Great job! Maintain your physique with our General Fitness plans.'}
                  {bmiResult.status === 'Overweight' && 'Time to burn some calories! Our Weight Loss and Cardio programs are perfect for you.'}
                  {bmiResult.status === 'Obese' && 'Let our Personal Trainers guide you safely towards a healthier lifestyle.'}
                </p>
              </div>
            ) : (
              <div className="text-[var(--landing-text-muted)]">
                <Heart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Enter your height and weight<br/>to see your BMI result here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
