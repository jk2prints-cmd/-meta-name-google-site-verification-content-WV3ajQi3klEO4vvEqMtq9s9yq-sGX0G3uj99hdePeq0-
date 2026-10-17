import { WorkoutProgram } from '../types';

export interface EducationalGuide {
  title: string;
  subtitle: string;
  content: {
    heading: string;
    description: string;
    takeaways: string[];
  }[];
}

export const HOW_TO_WORKOUT_GUIDE: EducationalGuide = {
  title: 'The Master Guide: How to Train with Scientific Intent',
  subtitle: 'Five non-negotiable principles separating lifelong gym progress from wasted hours and injury.',
  content: [
    {
      heading: '1. The Law of Progressive Overload',
      description: 'Muscles only grow when systematically forced to adapt to a tension greater than previously experienced. You do not always need to add heavy weight to progressively overload; you can increase reps, improve eccentric control tempo, reduce rest slightly, or expand range of motion.',
      takeaways: [
        'Aim for double progression: pick a rep range (e.g., 8-12). Once you can hit 12 reps on all sets with pristine form, increase the load by 2.5kg / 5lbs and work back up from 8 reps.',
        'Never sacrifice form for load. A lighter weight through a full range of motion under tension stimulates vastly more hypertrophy than ego-quarter-repping a heavy bar.'
      ]
    },
    {
      heading: '2. Mastering RPE & Reps in Reserve (RIR)',
      description: 'Training intensity determines whether muscle motor units are recruited. You do not need to train to failure on every single set; in fact, leaving 1 to 2 reps in the tank (RIR 1-2 or RPE 8-9) produces equivalent muscle growth with far less central nervous system fatigue.',
      takeaways: [
        'RPE 10 (0 RIR): Absolute mechanical failure; could not perform another rep even with a gun to your head.',
        'RPE 9 (1 RIR): 1 rep left in reserve. Ideal for final working sets of compound lifts and isolation exercises.',
        'RPE 8 (2 RIR): 2 reps left in reserve. The optimal hypertrophy sweet spot for main compound work (Squats, Bench, Deadlifts).'
      ]
    },
    {
      heading: '3. Volume & Weekly Set Benchmarks',
      description: 'Volume is the primary driver of muscle hypertrophy. Research demonstrates an inverted-U curve: too little volume stalls growth, while too much volume causes systemic overtraining and recovery breakdown.',
      takeaways: [
        'Maintenance Volume (MV): ~6 weekly sets per muscle group to keep existing muscle.',
        'Maximum Adaptive Volume (MAV): 10 to 18 hard weekly sets per muscle group for rapid growth.',
        'Spread weekly volume across 2 to 3 sessions per muscle rather than destroying a muscle once a week in an 18-set single session.'
      ]
    },
    {
      heading: '4. Dynamic Warm-Up & Feeder Sets Protocol',
      description: 'A proper warm-up elevates core body temperature, lubricates synovial joint capsules, primes neural motor unit recruitment, and prevents catastrophic soft tissue tears.',
      takeaways: [
        'Phase 1 (3-5 mins): Low-intensity pulse raiser (incline walk, rower, or stationary bike).',
        'Phase 2 (3 mins): Dynamic joint mobility (arm circles, leg swings, hip 90/90s, cat-cow).',
        'Phase 3: Specific Feeder Sets. For a 100kg working bench press: do 20kg (empty bar) x 10 reps, 50kg x 5, 75kg x 3, 90kg x 1. Never fatigue your muscles on warmups.'
      ]
    },
    {
      heading: '5. Rest Intervals & Recovery Physiology',
      description: 'Muscles synthesize adenosine triphosphate (ATP) via the phosphagen system during rest periods. Rushing sets prematurely limits motor unit recruitment.',
      takeaways: [
        'Compound Movements (Squat, Deadlift, Press): 2.5 to 3.5 minutes of rest allows complete phosphocreatine resynthesis for maximum mechanical tension.',
        'Isolation & Machine Movements (Curls, Lateral Raises, Pushdowns): 60 to 90 seconds of rest maximizes metabolic stress and pump while sustaining output.',
        'Deload Weeks: Every 6 to 9 weeks of continuous intense training, reduce working volume by 50% for 7 days to let tendons, ligaments, and the nervous system fully regenerate.'
      ]
    }
  ]
};

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'push-pull-legs',
    title: 'Push / Pull / Legs (PPL)',
    tagline: 'The Ultimate 6-Day Hypertrophy & Symmetry Split',
    daysPerWeek: 6,
    difficulty: 'Intermediate',
    goal: 'Hypertrophy & Aesthetic Physique',
    durationWeeks: 8,
    description: 'The most popular, scientifically validated split worldwide. Groups muscles by movement patterns, allowing each muscle group to be trained twice per week with 72 hours of recovery between sessions.',
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        title: 'Push Day A (Chest & Delts Focus)',
        focus: 'Chest, Front/Side Deltoids, Triceps',
        exercises: [
          { exerciseId: 'barbell-bench-press', exerciseName: 'Barbell Flat Bench Press', targetMuscle: 'Chest', sets: 4, reps: '6-8', rpe: 'RPE 8', restSec: 150, notes: 'Warm up thoroughly. Drive through heels.' },
          { exerciseId: 'incline-dumbbell-press', exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, reps: '8-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Set bench to 30 degrees. 2-second negative.' },
          { exerciseId: 'overhead-barbell-press', exerciseName: 'Standing Barbell Overhead Press', targetMuscle: 'Shoulders', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 120, notes: 'Squeeze glutes to protect spine.' },
          { exerciseId: 'dumbbell-lateral-raise', exerciseName: 'Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 4, reps: '12-15', rpe: 'RPE 9', restSec: 60, notes: 'Strict form, no swinging.' },
          { exerciseId: 'cable-tricep-pushdown', exerciseName: 'Cable Triceps Rope Pushdown', targetMuscle: 'Triceps', sets: 3, reps: '12-15', rpe: 'RPE 9', restSec: 60, notes: 'Flare rope outward at bottom.' }
        ]
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        title: 'Pull Day A (Back Thickness & Biceps)',
        focus: 'Back, Rear Delts, Biceps, Forearms',
        exercises: [
          { exerciseId: 'conventional-deadlift', exerciseName: 'Barbell Conventional Deadlift', targetMuscle: 'Posterior Chain', sets: 3, reps: '5', rpe: 'RPE 8', restSec: 180, notes: 'Reset bar to dead stop each rep.' },
          { exerciseId: 'pull-ups', exerciseName: 'Strict Wide-Grip Pull-Ups', targetMuscle: 'Lats Width', sets: 3, reps: '6-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Full hang at bottom.' },
          { exerciseId: 'barbell-bent-over-row', exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Upper Back', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 90, notes: 'Pull bar toward lower ribcage.' },
          { exerciseId: 'face-pull', exerciseName: 'Cable Face Pull with Rope', targetMuscle: 'Rear Delts', sets: 4, reps: '15-20', rpe: 'RPE 8.5', restSec: 60, notes: 'High external rotation at finish.' },
          { exerciseId: 'barbell-bicep-curl', exerciseName: 'Standing EZ-Bar Bicep Curl', targetMuscle: 'Biceps', sets: 3, reps: '10-12', rpe: 'RPE 9', restSec: 75, notes: 'Lock elbows to torso sides.' }
        ]
      },
      {
        dayNumber: 3,
        dayName: 'Wednesday',
        title: 'Legs Day A (Quad & Calves Dominant)',
        focus: 'Quads, Glutes, Hamstrings, Calves',
        exercises: [
          { exerciseId: 'barbell-back-squat', exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads & Glutes', sets: 4, reps: '6-8', rpe: 'RPE 8', restSec: 180, notes: 'Hit full depth below parallel.' },
          { exerciseId: 'romanian-deadlift', exerciseName: 'Barbell Romanian Deadlift (RDL)', targetMuscle: 'Hamstrings', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 120, notes: 'Hips back, feel deep stretch.' },
          { exerciseId: 'leg-press-machine', exerciseName: '45-Degree Incline Leg Press', targetMuscle: 'Quads', sets: 3, reps: '12-15', rpe: 'RPE 9', restSec: 90, notes: 'Keep hips pinned to pad.' },
          { exerciseId: 'standing-calf-raise', exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 4, reps: '15-20', rpe: 'RPE 9', restSec: 60, notes: '2-second dead stop at bottom.' }
        ]
      },
      {
        dayNumber: 4,
        dayName: 'Thursday',
        title: 'Push Day B (Upper Chest & Shoulder Width)',
        focus: 'Pecs, Lateral Delts, Tricep Long Head',
        exercises: [
          { exerciseId: 'incline-dumbbell-press', exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 4, reps: '8-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Deep stretch at bottom.' },
          { exerciseId: 'bodyweight-dips', exerciseName: 'Chest Dips', targetMuscle: 'Lower Chest / Triceps', sets: 3, reps: '10-12', rpe: 'RPE 8.5', restSec: 90, notes: 'Lean forward 30 degrees.' },
          { exerciseId: 'cable-chest-fly', exerciseName: 'Standing Cable Chest Fly', targetMuscle: 'Chest Squeeze', sets: 3, reps: '12-15', rpe: 'RPE 9', restSec: 60, notes: 'Cross hands slightly for peak contraction.' },
          { exerciseId: 'dumbbell-lateral-raise', exerciseName: 'Dumbbell Lateral Raise', targetMuscle: 'Lateral Delts', sets: 4, reps: '15-20', rpe: 'RPE 9.5', restSec: 60, notes: 'Controlled tempo.' },
          { exerciseId: 'skull-crushers', exerciseName: 'Lying EZ-Bar Skull Crushers', targetMuscle: 'Triceps Long Head', sets: 3, reps: '10-12', rpe: 'RPE 8.5', restSec: 90, notes: 'Lower bar behind head.' }
        ]
      },
      {
        dayNumber: 5,
        dayName: 'Friday',
        title: 'Pull Day B (Lat Width & Arm Density)',
        focus: 'Lats, Rhomboids, Biceps, Core',
        exercises: [
          { exerciseId: 'pull-ups', exerciseName: 'Strict Wide-Grip Pull-Ups', targetMuscle: 'Lats', sets: 4, reps: '8-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Add weight plate if able.' },
          { exerciseId: 'lat-pulldown', exerciseName: 'Cable Lat Pulldown', targetMuscle: 'Lats', sets: 3, reps: '10-12', rpe: 'RPE 8.5', restSec: 75, notes: 'Thumbless grip.' },
          { exerciseId: 'barbell-bent-over-row', exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Mid-Back', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 90, notes: 'Strict torso angle.' },
          { exerciseId: 'incline-dumbbell-curl', exerciseName: 'Incline Dumbbell Bicep Curl', targetMuscle: 'Biceps Long Head', sets: 3, reps: '10-12', rpe: 'RPE 9', restSec: 60, notes: 'Deep stretch at bottom.' },
          { exerciseId: 'hanging-leg-raise', exerciseName: 'Hanging Leg Raise', targetMuscle: 'Abs & Core', sets: 3, reps: '12-15', rpe: 'RPE 8.5', restSec: 60, notes: 'Curl pelvis up.' }
        ]
      },
      {
        dayNumber: 6,
        dayName: 'Saturday',
        title: 'Legs Day B (Glutes & Hamstring Hypertrophy)',
        focus: 'Glutes, Hamstrings, Quads, Core',
        exercises: [
          { exerciseId: 'romanian-deadlift', exerciseName: 'Barbell Romanian Deadlift (RDL)', targetMuscle: 'Hamstrings', sets: 4, reps: '8-10', rpe: 'RPE 8', restSec: 120, notes: 'Load the stretch.' },
          { exerciseId: 'bulgarian-split-squat', exerciseName: 'Bulgarian Split Squat', targetMuscle: 'Quads & Glutes', sets: 3, reps: '10-12/leg', rpe: 'RPE 9', restSec: 90, notes: 'Torso slightly tilted forward.' },
          { exerciseId: 'leg-press-machine', exerciseName: '45-Degree Incline Leg Press', targetMuscle: 'Quads', sets: 3, reps: '15-20', rpe: 'RPE 9', restSec: 90, notes: 'High volume pump finisher.' },
          { exerciseId: 'standing-calf-raise', exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 4, reps: '15-20', rpe: 'RPE 9', restSec: 60, notes: '2-sec stretch at bottom.' }
        ]
      }
    ]
  },
  {
    id: 'upper-lower-split',
    title: 'Upper / Lower Power & Size',
    tagline: 'The Gold Standard 4-Day High-Recovery Split',
    daysPerWeek: 4,
    difficulty: 'Intermediate',
    goal: 'Powerbuilding (Raw Strength + Hypertrophy)',
    durationWeeks: 10,
    description: 'Perfect for athletes balancing serious gym gains with life, work, or sports. Alternates between 2 dedicated Upper sessions and 2 dedicated Lower sessions per week with 3 full recovery days.',
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        title: 'Upper A (Heavy Power & Push Emphasis)',
        focus: 'Chest, Back, Shoulders, Arms',
        exercises: [
          { exerciseId: 'barbell-bench-press', exerciseName: 'Barbell Flat Bench Press', targetMuscle: 'Chest', sets: 4, reps: '5', rpe: 'RPE 8', restSec: 150, notes: 'Power setup.' },
          { exerciseId: 'barbell-bent-over-row', exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Back', sets: 4, reps: '6-8', rpe: 'RPE 8', restSec: 120, notes: 'Explosive pull.' },
          { exerciseId: 'overhead-barbell-press', exerciseName: 'Standing Barbell Overhead Press', targetMuscle: 'Shoulders', sets: 3, reps: '6-8', rpe: 'RPE 8', restSec: 120, notes: 'Lock out overhead.' },
          { exerciseId: 'barbell-bicep-curl', exerciseName: 'Standing EZ-Bar Bicep Curl', targetMuscle: 'Biceps', sets: 3, reps: '8-10', rpe: 'RPE 8.5', restSec: 75, notes: 'Strict form.' },
          { exerciseId: 'cable-tricep-pushdown', exerciseName: 'Cable Triceps Rope Pushdown', targetMuscle: 'Triceps', sets: 3, reps: '10-12', rpe: 'RPE 9', restSec: 60, notes: 'Full extension.' }
        ]
      },
      {
        dayNumber: 2,
        dayName: 'Tuesday',
        title: 'Lower A (Squat & Quad Dominance)',
        focus: 'Quads, Hamstrings, Calves, Abs',
        exercises: [
          { exerciseId: 'barbell-back-squat', exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads & Glutes', sets: 4, reps: '5-6', rpe: 'RPE 8', restSec: 180, notes: 'Heavy working sets.' },
          { exerciseId: 'romanian-deadlift', exerciseName: 'Barbell Romanian Deadlift (RDL)', targetMuscle: 'Hamstrings', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 120, notes: 'Deep stretch.' },
          { exerciseId: 'leg-press-machine', exerciseName: '45-Degree Incline Leg Press', targetMuscle: 'Quads', sets: 3, reps: '10-12', rpe: 'RPE 8.5', restSec: 90, notes: 'Controlled tempo.' },
          { exerciseId: 'standing-calf-raise', exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 4, reps: '12-15', rpe: 'RPE 9', restSec: 60, notes: '2s bottom pause.' },
          { exerciseId: 'hanging-leg-raise', exerciseName: 'Hanging Leg Raise', targetMuscle: 'Core', sets: 3, reps: '12-15', rpe: 'RPE 8.5', restSec: 60, notes: 'Curl pelvis.' }
        ]
      },
      {
        dayNumber: 3,
        dayName: 'Thursday',
        title: 'Upper B (Hypertrophy & Width)',
        focus: 'Upper Chest, Lat Width, Rear Delts, Arms',
        exercises: [
          { exerciseId: 'incline-dumbbell-press', exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 4, reps: '8-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Full ROM.' },
          { exerciseId: 'pull-ups', exerciseName: 'Strict Wide-Grip Pull-Ups', targetMuscle: 'Lats Width', sets: 4, reps: '8-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Controlled negative.' },
          { exerciseId: 'dumbbell-lateral-raise', exerciseName: 'Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 4, reps: '12-15', rpe: 'RPE 9', restSec: 60, notes: 'Scapular plane.' },
          { exerciseId: 'face-pull', exerciseName: 'Cable Face Pull with Rope', targetMuscle: 'Rear Delts', sets: 3, reps: '15-20', rpe: 'RPE 8.5', restSec: 60, notes: 'External rotation.' },
          { exerciseId: 'skull-crushers', exerciseName: 'Lying EZ-Bar Skull Crushers', targetMuscle: 'Triceps', sets: 3, reps: '10-12', rpe: 'RPE 8.5', restSec: 75, notes: 'Elbow safety.' }
        ]
      },
      {
        dayNumber: 4,
        dayName: 'Friday',
        title: 'Lower B (Deadlift & Posterior Chain)',
        focus: 'Posterior Chain, Glutes, Hamstrings, Quads',
        exercises: [
          { exerciseId: 'conventional-deadlift', exerciseName: 'Barbell Conventional Deadlift', targetMuscle: 'Posterior Chain', sets: 3, reps: '4-5', rpe: 'RPE 8', restSec: 180, notes: 'Crisp technique.' },
          { exerciseId: 'bulgarian-split-squat', exerciseName: 'Bulgarian Split Squat', targetMuscle: 'Quads & Glutes', sets: 3, reps: '10/leg', rpe: 'RPE 8.5', restSec: 90, notes: 'Unilateral focus.' },
          { exerciseId: 'standing-calf-raise', exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 4, reps: '15-20', rpe: 'RPE 9', restSec: 60, notes: 'Deep stretch.' },
          { exerciseId: 'cable-woodchoppers', exerciseName: 'Standing Cable Woodchopper', targetMuscle: 'Obliques', sets: 3, reps: '12-15/side', rpe: 'RPE 8', restSec: 60, notes: 'Core rotation.' }
        ]
      }
    ]
  },
  {
    id: 'full-body-foundation',
    title: 'Full Body 3-Day Foundation',
    tagline: 'Maximum Efficiency for Rapid Strength & Muscle Base',
    daysPerWeek: 3,
    difficulty: 'Beginner',
    goal: 'Foundational Strength & Total Body Muscle',
    durationWeeks: 12,
    description: 'The proven program for beginners or busy professionals. Each workout hits the entire body with high-yield compound lifts, creating maximum weekly motor learning and continuous stimulus.',
    days: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        title: 'Full Body Session A',
        focus: 'Squat, Horizontal Push, Horizontal Pull, Core',
        exercises: [
          { exerciseId: 'barbell-back-squat', exerciseName: 'Barbell Back Squat', targetMuscle: 'Legs', sets: 3, reps: '6-8', rpe: 'RPE 7.5', restSec: 150, notes: 'Focus on balance.' },
          { exerciseId: 'barbell-bench-press', exerciseName: 'Barbell Flat Bench Press', targetMuscle: 'Chest', sets: 3, reps: '6-8', rpe: 'RPE 7.5', restSec: 120, notes: 'Tuck shoulder blades.' },
          { exerciseId: 'barbell-bent-over-row', exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Back', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 90, notes: 'Flat back.' },
          { exerciseId: 'cable-tricep-pushdown', exerciseName: 'Cable Triceps Rope Pushdown', targetMuscle: 'Triceps', sets: 2, reps: '12-15', rpe: 'RPE 8.5', restSec: 60, notes: 'Elbows tight.' },
          { exerciseId: 'hanging-leg-raise', exerciseName: 'Hanging Leg Raise', targetMuscle: 'Core', sets: 2, reps: '10-12', rpe: 'RPE 8', restSec: 60, notes: 'Controlled tempo.' }
        ]
      },
      {
        dayNumber: 2,
        dayName: 'Wednesday',
        title: 'Full Body Session B',
        focus: 'Deadlift, Overhead Push, Vertical Pull, Arms',
        exercises: [
          { exerciseId: 'conventional-deadlift', exerciseName: 'Barbell Conventional Deadlift', targetMuscle: 'Posterior Chain', sets: 3, reps: '5', rpe: 'RPE 8', restSec: 180, notes: 'Tight core bracing.' },
          { exerciseId: 'overhead-barbell-press', exerciseName: 'Standing Barbell Overhead Press', targetMuscle: 'Shoulders', sets: 3, reps: '6-8', rpe: 'RPE 8', restSec: 120, notes: 'Full lockout.' },
          { exerciseId: 'lat-pulldown', exerciseName: 'Cable Lat Pulldown', targetMuscle: 'Lats', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 90, notes: 'Chest up.' },
          { exerciseId: 'barbell-bicep-curl', exerciseName: 'Standing EZ-Bar Bicep Curl', targetMuscle: 'Biceps', sets: 3, reps: '10-12', rpe: 'RPE 8.5', restSec: 60, notes: 'No hip swinging.' },
          { exerciseId: 'standing-calf-raise', exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, reps: '15', rpe: 'RPE 8.5', restSec: 60, notes: 'Full range.' }
        ]
      },
      {
        dayNumber: 3,
        dayName: 'Friday',
        title: 'Full Body Session C',
        focus: 'Unilateral Legs, Incline Press, Scapular Health',
        exercises: [
          { exerciseId: 'bulgarian-split-squat', exerciseName: 'Bulgarian Split Squat', targetMuscle: 'Quads & Glutes', sets: 3, reps: '8-10/leg', rpe: 'RPE 8', restSec: 90, notes: 'Drive through front heel.' },
          { exerciseId: 'incline-dumbbell-press', exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, reps: '8-10', rpe: 'RPE 8', restSec: 90, notes: '30-degree bench.' },
          { exerciseId: 'pull-ups', exerciseName: 'Strict Wide-Grip Pull-Ups', targetMuscle: 'Lats', sets: 3, reps: '6-10', rpe: 'RPE 8.5', restSec: 90, notes: 'Band assistance if needed.' },
          { exerciseId: 'dumbbell-lateral-raise', exerciseName: 'Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 3, reps: '12-15', rpe: 'RPE 9', restSec: 60, notes: 'Raise to parallel.' },
          { exerciseId: 'face-pull', exerciseName: 'Cable Face Pull with Rope', targetMuscle: 'Rear Delts', sets: 3, reps: '15-20', rpe: 'RPE 8.5', restSec: 60, notes: 'External rotation.' }
        ]
      }
    ]
  }
];
