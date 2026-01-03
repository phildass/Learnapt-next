"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const modules: Module[] = [
  {
    id: "learning-styles",
    title: "Learning Styles Assessment",
    description: "Comprehensive evaluation of how you prefer to receive and process information.",
    questions: [
      {
        id: "ls1",
        text: "When learning a new software application, I prefer to:",
        options: [
          { value: "visual", label: "Watch video tutorials or demonstrations" },
          { value: "auditory", label: "Listen to explanations or podcasts about it" },
          { value: "kinesthetic", label: "Jump right in and experiment with it" },
          { value: "reading", label: "Read the manual or documentation" },
        ],
      },
      {
        id: "ls2",
        text: "During presentations, I pay most attention when:",
        options: [
          { value: "visual", label: "There are slides with graphics and visuals" },
          { value: "auditory", label: "The speaker is engaging and articulate" },
          { value: "kinesthetic", label: "There are interactive activities included" },
          { value: "reading", label: "There are handouts to follow along" },
        ],
      },
      {
        id: "ls3",
        text: "I study most effectively when:",
        options: [
          { value: "visual", label: "Using mind maps and color-coded notes" },
          { value: "auditory", label: "Recording and listening to lectures" },
          { value: "kinesthetic", label: "Moving around or using flashcards" },
          { value: "reading", label: "Reading and rewriting notes" },
        ],
      },
      {
        id: "ls4",
        text: "When remembering directions, I:",
        options: [
          { value: "visual", label: "Visualize the route in my mind" },
          { value: "auditory", label: "Repeat the directions out loud" },
          { value: "kinesthetic", label: "Remember by driving/walking the route" },
          { value: "reading", label: "Write down the directions" },
        ],
      },
      {
        id: "ls5",
        text: "I express my ideas best through:",
        options: [
          { value: "visual", label: "Drawings, diagrams, or presentations" },
          { value: "auditory", label: "Verbal discussions and explanations" },
          { value: "kinesthetic", label: "Physical demonstrations or models" },
          { value: "reading", label: "Written documents and reports" },
        ],
      },
      {
        id: "ls6",
        text: "When assembling furniture, I prefer to:",
        options: [
          { value: "visual", label: "Look at the diagrams and pictures" },
          { value: "auditory", label: "Have someone explain the steps" },
          { value: "kinesthetic", label: "Figure it out by trial and error" },
          { value: "reading", label: "Read the written instructions carefully" },
        ],
      },
      {
        id: "ls7",
        text: "In a meeting, I remember information best when:",
        options: [
          { value: "visual", label: "I can see charts or visual aids" },
          { value: "auditory", label: "I hear the discussion" },
          { value: "kinesthetic", label: "I take notes while listening" },
          { value: "reading", label: "I read the agenda beforehand" },
        ],
      },
      {
        id: "ls8",
        text: "When learning about history, I prefer:",
        options: [
          { value: "visual", label: "Looking at timelines and maps" },
          { value: "auditory", label: "Listening to historical accounts" },
          { value: "kinesthetic", label: "Visiting museums and historical sites" },
          { value: "reading", label: "Reading historical texts and books" },
        ],
      },
      {
        id: "ls9",
        text: "To relax, I most enjoy:",
        options: [
          { value: "visual", label: "Watching movies or art" },
          { value: "auditory", label: "Listening to music or podcasts" },
          { value: "kinesthetic", label: "Physical activities or crafts" },
          { value: "reading", label: "Reading books or articles" },
        ],
      },
      {
        id: "ls10",
        text: "When solving a puzzle, I tend to:",
        options: [
          { value: "visual", label: "Look for visual patterns" },
          { value: "auditory", label: "Talk through the solution" },
          { value: "kinesthetic", label: "Try different approaches hands-on" },
          { value: "reading", label: "Read about solving strategies first" },
        ],
      },
    ],
  },
  {
    id: "cognitive-patterns",
    title: "Cognitive Patterns",
    description: "Explore how you think, process information, and approach mental challenges.",
    questions: [
      {
        id: "cp1",
        text: "When solving problems, I typically:",
        options: [
          { value: "sequential", label: "Work through steps in logical order" },
          { value: "global", label: "See the big picture first, then details" },
          { value: "analytical", label: "Break down into components" },
          { value: "intuitive", label: "Follow my instincts and hunches" },
        ],
      },
      {
        id: "cp2",
        text: "I process new information best when:",
        options: [
          { value: "concrete", label: "It's presented with real examples" },
          { value: "abstract", label: "I can understand the underlying theory" },
          { value: "practical", label: "I can see its practical application" },
          { value: "conceptual", label: "I understand how it connects to other ideas" },
        ],
      },
      {
        id: "cp3",
        text: "In discussions, I tend to:",
        options: [
          { value: "think-first", label: "Think carefully before speaking" },
          { value: "talk-through", label: "Talk through ideas to understand them" },
          { value: "question", label: "Ask many questions to clarify" },
          { value: "observe", label: "Observe and listen before contributing" },
        ],
      },
      {
        id: "cp4",
        text: "When facing ambiguity, I:",
        options: [
          { value: "structured", label: "Seek structure and clear guidelines" },
          { value: "explore", label: "Enjoy exploring possibilities" },
          { value: "research", label: "Research until I have clarity" },
          { value: "act", label: "Make a decision and adapt as I go" },
        ],
      },
      {
        id: "cp5",
        text: "My thinking style is best described as:",
        options: [
          { value: "linear", label: "Linear and methodical" },
          { value: "holistic", label: "Holistic and integrative" },
          { value: "creative", label: "Creative and divergent" },
          { value: "critical", label: "Critical and evaluative" },
        ],
      },
      {
        id: "cp6",
        text: "When making decisions, I prioritize:",
        options: [
          { value: "logic", label: "Logic and rational analysis" },
          { value: "feelings", label: "How I and others feel" },
          { value: "facts", label: "Objective facts and data" },
          { value: "values", label: "My personal values and principles" },
        ],
      },
      {
        id: "cp7",
        text: "I learn new concepts best by:",
        options: [
          { value: "step-by-step", label: "Following step-by-step procedures" },
          { value: "overview", label: "Getting an overview first" },
          { value: "examples", label: "Working through examples" },
          { value: "theory", label: "Understanding the theory behind it" },
        ],
      },
      {
        id: "cp8",
        text: "When reading technical material, I:",
        options: [
          { value: "systematic", label: "Read systematically from start to finish" },
          { value: "skim", label: "Skim to get the main ideas" },
          { value: "sections", label: "Jump to sections that interest me" },
          { value: "slow", label: "Read slowly and carefully" },
        ],
      },
      {
        id: "cp9",
        text: "My approach to planning is:",
        options: [
          { value: "detailed", label: "Make detailed plans in advance" },
          { value: "flexible", label: "Keep plans flexible and adaptable" },
          { value: "outline", label: "Create rough outlines" },
          { value: "spontaneous", label: "Prefer spontaneity over planning" },
        ],
      },
      {
        id: "cp10",
        text: "When learning from mistakes, I:",
        options: [
          { value: "analyze", label: "Analyze what went wrong systematically" },
          { value: "reflect", label: "Reflect on the experience" },
          { value: "move-on", label: "Move on and try something different" },
          { value: "discuss", label: "Discuss it with others" },
        ],
      },
    ],
  },
  {
    id: "problem-solving-deep",
    title: "Problem-Solving Approach",
    description: "Detailed analysis of your strategies for tackling challenges.",
    questions: [
      {
        id: "psd1",
        text: "When I encounter a problem, my first instinct is to:",
        options: [
          { value: "define", label: "Clearly define what the problem is" },
          { value: "research", label: "Research how others have solved it" },
          { value: "brainstorm", label: "Brainstorm possible solutions" },
          { value: "act", label: "Try something and see what happens" },
        ],
      },
      {
        id: "psd2",
        text: "I prefer to work on problems:",
        options: [
          { value: "alone", label: "Alone with focused concentration" },
          { value: "partner", label: "With a partner for discussion" },
          { value: "team", label: "In a team with diverse perspectives" },
          { value: "flexible", label: "Varies depending on the problem" },
        ],
      },
      {
        id: "psd3",
        text: "When stuck on a problem, I usually:",
        options: [
          { value: "persist", label: "Keep working until I solve it" },
          { value: "break", label: "Take a break and return fresh" },
          { value: "switch", label: "Switch to a different approach" },
          { value: "help", label: "Seek help or collaboration" },
        ],
      },
      {
        id: "psd4",
        text: "I evaluate solutions by:",
        options: [
          { value: "logic", label: "Logical analysis of pros and cons" },
          { value: "testing", label: "Testing and experimentation" },
          { value: "feedback", label: "Getting feedback from others" },
          { value: "intuition", label: "Trusting my gut feeling" },
        ],
      },
      {
        id: "psd5",
        text: "After solving a problem, I:",
        options: [
          { value: "document", label: "Document the solution for future reference" },
          { value: "move-on", label: "Move on to the next challenge" },
          { value: "reflect", label: "Reflect on what I learned" },
          { value: "share", label: "Share the solution with others" },
        ],
      },
      {
        id: "psd6",
        text: "When facing multiple problems, I:",
        options: [
          { value: "prioritize", label: "Prioritize and tackle them one by one" },
          { value: "parallel", label: "Work on several simultaneously" },
          { value: "urgent", label: "Handle the most urgent first" },
          { value: "easy", label: "Start with the easiest ones" },
        ],
      },
      {
        id: "psd7",
        text: "My problem-solving creativity comes from:",
        options: [
          { value: "experience", label: "Drawing from past experiences" },
          { value: "exploration", label: "Exploring new possibilities" },
          { value: "combination", label: "Combining different ideas" },
          { value: "inspiration", label: "Sudden insights and inspiration" },
        ],
      },
      {
        id: "psd8",
        text: "When a deadline is approaching, I:",
        options: [
          { value: "focused", label: "Become more focused and efficient" },
          { value: "stressed", label: "Feel stressed but push through" },
          { value: "calm", label: "Stay calm and work steadily" },
          { value: "energized", label: "Feel energized by the pressure" },
        ],
      },
      {
        id: "psd9",
        text: "I handle unexpected obstacles by:",
        options: [
          { value: "adapt", label: "Quickly adapting my approach" },
          { value: "analyze", label: "Analyzing the new situation" },
          { value: "consult", label: "Consulting with others" },
          { value: "persist", label: "Persisting with my original plan" },
        ],
      },
      {
        id: "psd10",
        text: "My confidence in solving problems comes from:",
        options: [
          { value: "skills", label: "My proven skills and abilities" },
          { value: "preparation", label: "Being well-prepared" },
          { value: "experience", label: "Past successful experiences" },
          { value: "optimism", label: "General optimism and confidence" },
        ],
      },
    ],
  },
  {
    id: "motivation-comprehensive",
    title: "Motivation & Drive",
    description: "Comprehensive assessment of what motivates and sustains your effort.",
    questions: [
      {
        id: "mc1",
        text: "I am most motivated to learn when:",
        options: [
          { value: "interest", label: "The topic genuinely interests me" },
          { value: "necessity", label: "It's necessary for my goals" },
          { value: "challenge", label: "It presents a challenging puzzle" },
          { value: "reward", label: "There's a clear reward or outcome" },
        ],
      },
      {
        id: "mc2",
        text: "I set goals that are:",
        options: [
          { value: "ambitious", label: "Ambitious and stretching" },
          { value: "achievable", label: "Realistic and achievable" },
          { value: "incremental", label: "Small and incremental" },
          { value: "flexible", label: "Flexible and adjustable" },
        ],
      },
      {
        id: "mc3",
        text: "Feedback motivates me most when it:",
        options: [
          { value: "positive", label: "Recognizes my achievements" },
          { value: "constructive", label: "Helps me improve" },
          { value: "specific", label: "Is specific and actionable" },
          { value: "comparative", label: "Shows how I compare to others" },
        ],
      },
      {
        id: "mc4",
        text: "I maintain long-term motivation through:",
        options: [
          { value: "vision", label: "Keeping my end vision in mind" },
          { value: "milestones", label: "Celebrating small milestones" },
          { value: "habits", label: "Building consistent habits" },
          { value: "variety", label: "Keeping things varied and fresh" },
        ],
      },
      {
        id: "mc5",
        text: "What energizes me most is:",
        options: [
          { value: "mastery", label: "Mastering new skills" },
          { value: "connection", label: "Connecting with others" },
          { value: "autonomy", label: "Having autonomy and control" },
          { value: "purpose", label: "Contributing to something meaningful" },
        ],
      },
      {
        id: "mc6",
        text: "When I lose motivation, I regain it by:",
        options: [
          { value: "break", label: "Taking a break and resting" },
          { value: "goals", label: "Revisiting my goals" },
          { value: "success", label: "Remembering past successes" },
          { value: "others", label: "Seeking inspiration from others" },
        ],
      },
      {
        id: "mc7",
        text: "I am motivated by challenges that are:",
        options: [
          { value: "difficult", label: "Difficult but achievable" },
          { value: "new", label: "New and unfamiliar" },
          { value: "meaningful", label: "Meaningful and impactful" },
          { value: "competitive", label: "Competitive and measurable" },
        ],
      },
      {
        id: "mc8",
        text: "Success for me means:",
        options: [
          { value: "achievement", label: "Achieving my goals" },
          { value: "growth", label: "Personal growth and learning" },
          { value: "recognition", label: "Recognition from others" },
          { value: "contribution", label: "Making a valuable contribution" },
        ],
      },
      {
        id: "mc9",
        text: "I stay committed to long-term goals by:",
        options: [
          { value: "discipline", label: "Maintaining strict discipline" },
          { value: "reminders", label: "Using reminders and tracking" },
          { value: "passion", label: "Following my passion" },
          { value: "accountability", label: "Having accountability partners" },
        ],
      },
      {
        id: "mc10",
        text: "When facing setbacks, I:",
        options: [
          { value: "resilient", label: "Bounce back quickly" },
          { value: "analyze", label: "Analyze what went wrong" },
          { value: "support", label: "Seek support from others" },
          { value: "reframe", label: "Reframe it as a learning opportunity" },
        ],
      },
    ],
  },
  {
    id: "environment-preferences",
    title: "Learning Environment Preferences",
    description: "Identify the conditions that help you learn most effectively.",
    questions: [
      {
        id: "ep1",
        text: "My ideal learning environment is:",
        options: [
          { value: "quiet", label: "Quiet and distraction-free" },
          { value: "background", label: "With background noise or music" },
          { value: "social", label: "With others around for interaction" },
          { value: "varied", label: "Varies depending on my mood" },
        ],
      },
      {
        id: "ep2",
        text: "I learn best at:",
        options: [
          { value: "morning", label: "Early morning when I'm fresh" },
          { value: "afternoon", label: "Afternoon after warming up" },
          { value: "evening", label: "Evening when things quiet down" },
          { value: "night", label: "Late night with no distractions" },
        ],
      },
      {
        id: "ep3",
        text: "For sustained learning, I need:",
        options: [
          { value: "long-blocks", label: "Long uninterrupted blocks of time" },
          { value: "short-bursts", label: "Short focused bursts with breaks" },
          { value: "variety", label: "Variety in activities and topics" },
          { value: "flexibility", label: "Flexibility to follow my interest" },
        ],
      },
      {
        id: "ep4",
        text: "Technology in learning helps me:",
        options: [
          { value: "essential", label: "It's essential for how I learn" },
          { value: "supplement", label: "As a supplement to other methods" },
          { value: "sometimes", label: "Sometimes, but I prefer traditional methods" },
          { value: "minimal", label: "I prefer minimal technology" },
        ],
      },
      {
        id: "ep5",
        text: "I prefer learning resources that are:",
        options: [
          { value: "structured", label: "Highly structured with clear paths" },
          { value: "exploratory", label: "Exploratory with room to wander" },
          { value: "interactive", label: "Interactive with immediate feedback" },
          { value: "comprehensive", label: "Comprehensive and detailed" },
        ],
      },
      {
        id: "ep6",
        text: "My ideal study space is:",
        options: [
          { value: "home", label: "At home in a familiar setting" },
          { value: "library", label: "In a library or quiet public space" },
          { value: "cafe", label: "In a café with ambient noise" },
          { value: "outdoors", label: "Outdoors in nature" },
        ],
      },
      {
        id: "ep7",
        text: "When learning, I prefer:",
        options: [
          { value: "solo", label: "Working alone" },
          { value: "pair", label: "Working with one partner" },
          { value: "group", label: "Working in a small group" },
          { value: "class", label: "Learning in a class setting" },
        ],
      },
      {
        id: "ep8",
        text: "I concentrate best when:",
        options: [
          { value: "silence", label: "In complete silence" },
          { value: "white-noise", label: "With white noise or nature sounds" },
          { value: "music", label: "Listening to music" },
          { value: "varies", label: "It varies by task" },
        ],
      },
      {
        id: "ep9",
        text: "My energy levels for learning are highest:",
        options: [
          { value: "consistent", label: "Consistently throughout the day" },
          { value: "morning-peak", label: "With a clear morning peak" },
          { value: "afternoon-peak", label: "In the afternoon" },
          { value: "evening-peak", label: "In the evening or night" },
        ],
      },
      {
        id: "ep10",
        text: "I manage distractions by:",
        options: [
          { value: "eliminate", label: "Eliminating them completely" },
          { value: "schedule", label: "Scheduling breaks for them" },
          { value: "accept", label: "Accepting some level of distraction" },
          { value: "tools", label: "Using apps or tools to block them" },
        ],
      },
    ],
  },
  {
    id: "numerical-data-reasoning",
    title: "Numerical & Data Reasoning",
    description: "Comprehensive evaluation of numerical aptitude and data interpretation skills.",
    questions: [
      {
        id: "ndr1",
        text: "A shopkeeper sells an item for ₹1,350 after giving a 10% discount. What was the original price?",
        options: [
          { value: "c", label: "₹1,500" },
          { value: "a", label: "₹1,450" },
          { value: "b", label: "₹1,485" },
          { value: "d", label: "₹1,550" },
          { value: "e", label: "I don't know" },
        ],
      },
      {
        id: "ndr2",
        text: "If 5 workers can complete a task in 12 days, how many days will 8 workers take at the same rate?",
        options: [
          { value: "c", label: "7.5 days" },
          { value: "a", label: "6.5 days" },
          { value: "b", label: "7 days" },
          { value: "d", label: "8 days" },
          { value: "e", label: "I don't know" },
        ],
      },
      {
        id: "ndr3",
        text: "A tank is 3/4 full. After using 30 liters, it becomes 1/2 full. What is the tank's capacity?",
        options: [
          { value: "b", label: "120 liters" },
          { value: "a", label: "100 liters" },
          { value: "c", label: "140 liters" },
          { value: "d", label: "150 liters" },
          { value: "e", label: "I don't know" },
        ],
      },
      {
        id: "ndr4",
        text: "A person invests ₹25,000 at 8% simple interest per annum. What is the interest after 3 years?",
        options: [
          { value: "c", label: "₹6,000" },
          { value: "a", label: "₹5,000" },
          { value: "b", label: "₹5,500" },
          { value: "d", label: "₹6,500" },
          { value: "e", label: "I don't know" },
        ],
      },
      {
        id: "ndr5",
        text: "What is the average of the following numbers: 42, 58, 73, 61, 51?",
        options: [
          { value: "b", label: "57" },
          { value: "a", label: "55" },
          { value: "c", label: "59" },
          { value: "d", label: "61" },
          { value: "e", label: "I don't know" },
        ],
      },
      {
        id: "ndr6",
        text: "If a product costs ₹850 after a 15% discount, what was the original price?",
        options: [
          { value: "1000", label: "₹1,000" },
          { value: "950", label: "₹950" },
          { value: "1050", label: "₹1,050" },
          { value: "900", label: "₹900" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "ndr7",
        text: "A company's revenue increased from ₹5,00,000 to ₹6,50,000. What is the percentage increase?",
        options: [
          { value: "30", label: "30%" },
          { value: "20", label: "20%" },
          { value: "25", label: "25%" },
          { value: "35", label: "35%" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "ndr8",
        text: "If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?",
        options: [
          { value: "10", label: "10" },
          { value: "12", label: "12" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "ndr9",
        text: "A train travels 360 km in 4 hours. What is its average speed?",
        options: [
          { value: "90", label: "90 km/h" },
          { value: "85", label: "85 km/h" },
          { value: "95", label: "95 km/h" },
          { value: "80", label: "80 km/h" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "ndr10",
        text: "What is 20% of 450 plus 30% of 200?",
        options: [
          { value: "150", label: "150" },
          { value: "140", label: "140" },
          { value: "160", label: "160" },
          { value: "170", label: "170" },
          { value: "idk", label: "I don't know" },
        ],
      },
    ],
  },
  {
    id: "quantitative-aptitude",
    title: "Quantitative Aptitude",
    description: "Evaluate your numerical reasoning and problem-solving abilities with practical examples.",
    questions: [
      {
        id: "qa1",
        text: "A vendor sells mangoes at ₹60 per kg and makes a profit of 20%. What was the cost price per kg?",
        options: [
          { value: "50", label: "₹50" },
          { value: "45", label: "₹45" },
          { value: "48", label: "₹48" },
          { value: "55", label: "₹55" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa2",
        text: "If a laptop costs ₹45,000 after a 10% discount, what was the original price?",
        options: [
          { value: "50000", label: "₹50,000" },
          { value: "49500", label: "₹49,500" },
          { value: "48000", label: "₹48,000" },
          { value: "51000", label: "₹51,000" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa3",
        text: "A person saves ₹1,200 per month. If they want to buy a phone worth ₹18,000, how many months of savings are needed?",
        options: [
          { value: "15", label: "15 months" },
          { value: "12", label: "12 months" },
          { value: "18", label: "18 months" },
          { value: "10", label: "10 months" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa4",
        text: "Three friends share a restaurant bill of ₹2,400 in the ratio 2:3:3. How much does the first person pay?",
        options: [
          { value: "600", label: "₹600" },
          { value: "800", label: "₹800" },
          { value: "900", label: "₹900" },
          { value: "750", label: "₹750" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa5",
        text: "If 5 workers can complete a task in 12 days, how many workers are needed to complete it in 8 days?",
        options: [
          { value: "7.5", label: "7.5 workers" },
          { value: "8", label: "8 workers" },
          { value: "7", label: "7 workers" },
          { value: "6", label: "6 workers" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa6",
        text: "A shopkeeper marks up an item by 25% and then offers a 10% discount. If the cost price is ₹800, what is the selling price?",
        options: [
          { value: "900", label: "₹900" },
          { value: "850", label: "₹850" },
          { value: "920", label: "₹920" },
          { value: "880", label: "₹880" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa7",
        text: "If a car travels 420 km in 6 hours, what is its average speed?",
        options: [
          { value: "70", label: "70 km/h" },
          { value: "75", label: "75 km/h" },
          { value: "65", label: "65 km/h" },
          { value: "80", label: "80 km/h" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa8",
        text: "A person invests ₹25,000 at 8% simple interest per annum. What is the total amount after 3 years?",
        options: [
          { value: "31000", label: "₹31,000" },
          { value: "30000", label: "₹30,000" },
          { value: "32000", label: "₹32,000" },
          { value: "29000", label: "₹29,000" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa9",
        text: "What is the area of a rectangle with length 15 cm and width 8 cm?",
        options: [
          { value: "120", label: "120 sq cm" },
          { value: "115", label: "115 sq cm" },
          { value: "125", label: "125 sq cm" },
          { value: "130", label: "130 sq cm" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "qa10",
        text: "If 12 notebooks cost ₹360, what is the cost of 7 notebooks?",
        options: [
          { value: "210", label: "₹210" },
          { value: "200", label: "₹200" },
          { value: "220", label: "₹220" },
          { value: "240", label: "₹240" },
          { value: "idk", label: "I don't know" },
        text: "A shopkeeper marks up an item by 25% and then offers a 10% discount. If the cost price is ₹800, what is the selling price?",
        options: [
          { value: "900", label: "₹900" },
          { value: "850", label: "₹850" },
          { value: "920", label: "₹920" },
          { value: "880", label: "₹880" },
        ],
      },
    ],
  },
  {
    id: "abstract-logical-reasoning",
    title: "Abstract & Logical Reasoning",
    description: "Advanced pattern recognition, logical deduction, and analytical thinking.",
    questions: [
      {
        id: "alr1",
        text: "Complete the series: 3, 9, 27, 81, ?",
        options: [
          { value: "243", label: "243" },
          { value: "162", label: "162" },
          { value: "216", label: "216" },
          { value: "324", label: "324" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr2",
        text: "If all roses are flowers and some flowers are red, which conclusion is certain?",
        options: [
          { value: "d", label: "None of these is certain" },
          { value: "a", label: "All roses are red" },
          { value: "b", label: "Some roses are red" },
          { value: "c", label: "All red things are roses" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr3",
        text: "What comes next in the pattern: Z, Y, X, W, V, ?",
        options: [
          { value: "U", label: "U" },
          { value: "T", label: "T" },
          { value: "S", label: "S" },
          { value: "R", label: "R" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr4",
        text: "If CODE is written as FRGH, how is MIND written?",
        options: [
          { value: "PLQG", label: "PLQG" },
          { value: "NLQG", label: "NLQG" },
          { value: "OKPI", label: "OKPI" },
          { value: "MIND", label: "MIND" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr5",
        text: "What is the next number in the sequence: 2, 5, 11, 23, 47, ?",
        options: [
          { value: "95", label: "95" },
          { value: "89", label: "89" },
          { value: "91", label: "91" },
          { value: "93", label: "93" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr6",
        text: "If A > B and B > C, which statement is always true?",
        options: [
          { value: "greater", label: "A > C" },
          { value: "equal", label: "A = C" },
          { value: "less", label: "A < C" },
          { value: "none", label: "Cannot be determined" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr7",
        text: "Complete the sequence: 1, 4, 9, 16, 25, ?",
        options: [
          { value: "36", label: "36" },
          { value: "30", label: "30" },
          { value: "32", label: "32" },
          { value: "40", label: "40" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr8",
        text: "If some cats are black and all black things are beautiful, what can we conclude?",
        options: [
          { value: "some", label: "Some cats are beautiful" },
          { value: "all", label: "All cats are beautiful" },
          { value: "no", label: "No cats are beautiful" },
          { value: "none", label: "Cannot be determined" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr9",
        text: "What number should replace the question mark: 5, 10, 20, 40, ?",
        options: [
          { value: "80", label: "80" },
          { value: "60", label: "60" },
          { value: "70", label: "70" },
          { value: "100", label: "100" },
          { value: "idk", label: "I don't know" },
        ],
      },
      {
        id: "alr10",
        text: "If P is the sister of Q, and Q is the brother of R, what is P to R?",
        options: [
          { value: "sister", label: "Sister" },
          { value: "brother", label: "Brother" },
          { value: "cousin", label: "Cousin" },
          { value: "cannot", label: "Cannot be determined" },
          { value: "idk", label: "I don't know" },
        id: "svr5",
        text: "How many faces does a rectangular prism (cuboid) have?",
        options: [
          { value: "a", label: "A) 4" },
          { value: "b", label: "B) 6" },
          { value: "c", label: "C) 8" },
          { value: "d", label: "D) 12" },
          { value: "e", label: "E) I don't know" },
        ],
      },
    ],
  },
];

export default function ElaborateTestPage() {
  const router = useRouter();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentModule = modules[currentModuleIndex];
  const currentQuestion = currentModule.questions[currentQuestionIndex];
  const totalQuestions = modules.reduce((acc, m) => acc + m.questions.length, 0);
  
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = useMemo(() => (answeredCount / totalQuestions) * 100, [answeredCount, totalQuestions]);
  
  const isFirstQuestion = currentModuleIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion = currentModuleIndex === modules.length - 1 && 
    currentQuestionIndex === currentModule.questions.length - 1;

  const handleSelectAnswer = useCallback((value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  }, [currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < currentModule.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  }, [currentQuestionIndex, currentModuleIndex, currentModule.questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex((prev) => prev - 1);
      const prevModule = modules[currentModuleIndex - 1];
      setCurrentQuestionIndex(prevModule.questions.length - 1);
    }
  }, [currentQuestionIndex, currentModuleIndex]);

  const handleSubmit = useCallback(() => {
    setIsAnalyzing(true);
    
    // Store answers in sessionStorage for the results page
    const resultsData = {
      testType: "elaborate",
      answers,
      modules: modules.map((m) => ({
        id: m.id,
        title: m.title,
        answers: m.questions.map((q) => ({
          questionId: q.id,
          question: q.text,
          answer: answers[q.id] || null,
        })),
      })),
      completedAt: new Date().toISOString(),
    };
    
    sessionStorage.setItem("learnapt-results", JSON.stringify(resultsData));
    
    // Also save to localStorage for admin history
    try {
      const historyStr = localStorage.getItem("learnapt-assessment-history");
      const history = historyStr ? JSON.parse(historyStr) : [];
      history.unshift({
        id: `elaborate-${Date.now()}`,
        ...resultsData,
      });
      // Keep only last 100 assessments
      localStorage.setItem("learnapt-assessment-history", JSON.stringify(history.slice(0, 100)));
    } catch (e) {
      console.error("Failed to save assessment history:", e);
    }
    
    // Short delay to show analyzing state, then navigate
    setTimeout(() => {
      router.push("/results");
    }, 1500);
  }, [answers, router]);

  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">Learnapt</span>
            </Link>
            <span className="text-sm text-slate-500 dark:text-slate-400">Elaborate Test</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {isAnalyzing ? (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Analyzing Your Responses
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we prepare your comprehensive results...
            </p>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                <span>{answeredCount} of {totalQuestions} questions answered</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Module Info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded">
                  Module {currentModuleIndex + 1} of {modules.length}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {currentModule.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentModule.description}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Question {currentQuestionIndex + 1} of {currentModule.questions.length}
              </p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                {currentQuestion.text}
              </h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelectAnswer(option.value)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      currentAnswer === option.value
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                        : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          currentAnswer === option.value
                            ? "border-purple-600 bg-purple-600"
                            : "border-slate-300 dark:border-slate-500"
                        }`}
                      >
                        {currentAnswer === option.value && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className={`${
                        currentAnswer === option.value
                          ? "text-purple-900 dark:text-purple-100"
                          : "text-slate-700 dark:text-slate-300"
                      }`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isFirstQuestion
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  disabled={answeredCount < totalQuestions}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                    answeredCount < totalQuestions
                      ? "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  Submit Test
                  <Check className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                    !currentAnswer
                      ? "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
