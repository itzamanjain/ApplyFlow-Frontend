'use client'

import React from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full  min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center px-4">
     
      
      <Card className="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl border-none bg-black  backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row">
          {/* Left content */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight mb-6">
              Resume AI Assistance
            </h1>
            <p className="text-lg text-neutral-300 max-w-lg mb-8">
              Answer questions from your resume instantly and auto-fill job forms effortlessly. Simplify your application process with AI-driven solutions designed for speed and accuracy.
            </p>
            <Link to='/resume'>
            <Button className="w-full sm:w-auto" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>

          {/* Right content */}
          <div className="flex-1 relative min-h-[300px] lg:min-h-[500px]">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full absolute inset-0"
            />
          </div>
        </div>
      </Card>
      
    </div>
  )
}
