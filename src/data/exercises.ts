import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  // CHEST
  {
    id: 'barbell-bench-press',
    name: 'Barbell Flat Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Pectoralis Major (Sternal Head)',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    overview: 'The gold standard compound exercise for horizontal pressing power, upper-body density, and pectoral development.',
    setupSteps: [
      'Lie flat with eyes directly aligned below the racked bar. Plant your feet flat into the floor at shoulder width.',
      'Grip the bar slightly wider than shoulder width (forearms vertical at the bottom). Retract your shoulder blades and depress your scapulae.',
      'Unrack by pulling the bar forward into position directly over your shoulder joints with locked elbows and tight lats.'
    ],
    executionSteps: [
      'Inhale deep into your belly, brace your core, and lower the bar under control along a gentle arc toward your mid-sternum.',
      'Maintain tucked elbows at approximately 45° to 70° relative to your torso. Avoid flaring out to 90°.',
      'Touch your chest softly without bouncing. Drive your feet into the floor, push the bar explosively up and slightly backward over your shoulders to full lockout.'
    ],
    proTips: [
      'Screw your feet into the floor to generate leg drive before initiating the push.',
      'Squeeze the barbell as if trying to bend it into a "U" to actively engage the lats for shoulder stability.',
      'Keep your wrists stacked directly over your forearms rather than letting them bend backwards.'
    ],
    commonMistakes: [
      'Bouncing the barbell off the sternum using momentum rather than muscular control.',
      'Flaring elbows out at 90°, putting immense impingement stress on the anterior shoulder capsule.',
      'Lifting your hips and buttocks off the bench during heavy effort, risking lumbar hyperextension.'
    ],
    recommendedSets: '3 - 5 sets',
    recommendedReps: '5 - 8 reps',
    defaultRestSec: 150
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Pectoralis Major (Clavicular Head / Upper Chest)',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    overview: 'Isolates and emphasizes the upper clavicular fibers of the chest while providing independent unilateral shoulder stability and an expansive range of motion.',
    setupSteps: [
      'Adjust an incline bench to 30° to 45° (steeper than 45° shifts load excessively onto the shoulders).',
      'Sit down with dumbbells resting upright on your thighs. Kick knees up one at a time to kick the weights into starting position at chest level.',
      'Pull your shoulder blades back and down into the pad and plant your feet firmly on the ground.'
    ],
    executionSteps: [
      'Press dumbbells upward along a converging arc until arms are extended but not hyperextended.',
      'Lower the weights under strict control over 2-3 seconds until you feel a deep, comfortable stretch across the upper pectorals.',
      'Drive upwards through the mid-foot, bringing dumbbells inward together at the peak without clanking them.'
    ],
    proTips: [
      'Rotate your wrists into a slight semi-neutral grip (30° angle) to keep the subacromial space open and pain-free.',
      'Pause for a half-second in the fully stretched bottom position to eliminate elastic recoil.'
    ],
    commonMistakes: [
      'Setting the bench too steep (60°), turning the movement essentially into a shoulder press.',
      'Banging dumbbells together aggressively at the top, losing tension at the lockout.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '8 - 12 reps',
    defaultRestSec: 90
  },
  {
    id: 'cable-chest-fly',
    name: 'Standing Cable Chest Fly',
    category: 'Chest',
    equipment: 'Cable',
    difficulty: 'Beginner',
    targetMuscle: 'Pectoralis Major (Sternal & Sternal-Costal)',
    secondaryMuscles: ['Anterior Deltoids', 'Biceps Short Head (stabilizing)'],
    overview: 'Provides continuous horizontal adduction resistance across the entire range of motion, delivering unmatched peak contraction at the shortened muscle length.',
    setupSteps: [
      'Set pulleys at shoulder or chest height with stirrup handles attached.',
      'Grasp both handles, take a staggered step forward into a lunge stance for base stability, and lean your torso slightly forward.',
      'Maintain a slight bend at the elbows and keep shoulder blades retracted.'
    ],
    executionSteps: [
      'Bring both hands together forward in a hugging motion along an arc until your knuckles or wrists meet.',
      'Hold the peak squeeze for 1 full second, contracting your pectorals hard.',
      'Slowly open your arms back along the same arc under tension until a moderate pectoral stretch is reached.'
    ],
    proTips: [
      'Think of wrapping your arms around a giant tree trunk; maintain the fixed elbow angle throughout the entire rep.',
      'Cross your hands slightly over each other at peak contraction to achieve deeper horizontal adduction.'
    ],
    commonMistakes: [
      'Turning the fly into a press by excessively bending and extending the elbows.',
      'Using excessive body sway or momentum to propel the cables forward.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '12 - 15 reps',
    defaultRestSec: 60
  },
  {
    id: 'bodyweight-dips',
    name: 'Chest Dips',
    category: 'Chest',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    targetMuscle: 'Lower Pectoralis Major & Triceps',
    secondaryMuscles: ['Anterior Deltoids', 'Latissimus Dorsi (stabilizing)'],
    overview: 'A premier closed-chain compound movement often described as the upper-body squat for chest thickness and pressing power.',
    setupSteps: [
      'Mount parallel dip bars with arms fully locked and palms facing inward.',
      'Lean your torso forward at roughly a 30° angle, cross your ankles, and bend your knees slightly.'
    ],
    executionSteps: [
      'Lower your body by bending elbows and shoulders until your upper arms are parallel to the floor (approx 90° elbow bend).',
      'Keep your elbows slightly flared outwards to emphasize the pectoral stretch.',
      'Push forcefully through your palms back to the top position, maintaining the forward torso lean.'
    ],
    proTips: [
      'Avoid dipping past shoulder comfort if you have limited shoulder extension mobility.',
      'Add a dip belt with weight plates once you can cleanly execute 12 strict bodyweight reps.'
    ],
    commonMistakes: [
      'Staying completely upright, which shifts the emphasis almost exclusively to the triceps.',
      'Shrugging the shoulders up toward the ears, compromising rotator cuff safety.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '8 - 12 reps',
    defaultRestSec: 90
  },

  // BACK
  {
    id: 'conventional-deadlift',
    name: 'Barbell Conventional Deadlift',
    category: 'Back',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    targetMuscle: 'Erector Spinae & Posterior Chain',
    secondaryMuscles: ['Gluteus Maximus', 'Hamstrings', 'Latissimus Dorsi', 'Trapezius', 'Forearms'],
    overview: 'The king of functional whole-body strength lifts. Builds unmatched back thickness, spinal erector density, grip strength, and posterior chain power.',
    setupSteps: [
      'Stand with feet hip-width apart, toes pointing forward or slightly outward. The barbell should cross over your midfoot (1 inch from shins).',
      'Hinge hips back and grip the bar just outside your knees with a double overhand or hook grip.',
      'Bring shins to touch the bar without moving it. Pull your chest tall, retract lats, and take the slack out of the bar until it clicks.'
    ],
    executionSteps: [
      'Brace your abdominal wall with the Valsalva maneuver. Push the floor away through your mid-foot and heels.',
      'Keep the barbell in continuous contact with your shins and thighs as your knees and hips extend simultaneously.',
      'Lock out standing tall by squeezing glutes at the top. Do not hyperextend your lumbar spine.',
      'Hinge hips back to lower the bar under control back to a dead stop on the floor.'
    ],
    proTips: [
      'Imagine "wedging" your hips into the bar while pulling your armpits down into your back pockets.',
      'Every repetition should start from a dead stop on the ground to build raw starting strength.'
    ],
    commonMistakes: [
      'Rounding the lower back (lumbar flexion) off the floor, placing severe shear stress on intervertebral discs.',
      'Letting the bar drift away from the body during the pull, drastically increasing resistance arm torque.'
    ],
    recommendedSets: '3 - 5 sets',
    recommendedReps: '3 - 6 reps',
    defaultRestSec: 180
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    category: 'Back',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Latissimus Dorsi & Rhomboids',
    secondaryMuscles: ['Rear Deltoids', 'Trapezius', 'Biceps Brachii', 'Lower Back'],
    overview: 'Essential horizontal pulling builder for back thickness, middle trapezius density, and isometric core endurance.',
    setupSteps: [
      'Stand with feet shoulder-width apart holding the bar with an overhand grip slightly wider than your knees.',
      'Hinge at your hips until your torso is roughly 45° to the floor (or near-parallel for Pendlay style) with knees softly bent and back flat.'
    ],
    executionSteps: [
      'Pull the barbell towards your lower ribcage / navel by driving your elbows up and back.',
      'Retract your shoulder blades forcefully at the peak contraction for 1 count.',
      'Lower the bar under control until arms are extended and lats are stretched, keeping torso stationary.'
    ],
    proTips: [
      'Keep your neck neutral—pick a spot on the floor 6 feet in front of you to gaze at.',
      'Avoid jerking your upper body upward to yank the weight; isolate the back musculature.'
    ],
    commonMistakes: [
      'Standing too upright (60°+ angle), turning the row into an awkward shrug.',
      'Excessive spinal movement and bouncing knees to heave the bar.'
    ],
    recommendedSets: '4 sets',
    recommendedReps: '6 - 10 reps',
    defaultRestSec: 120
  },
  {
    id: 'pull-ups',
    name: 'Strict Wide-Grip Pull-Ups',
    category: 'Back',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    targetMuscle: 'Latissimus Dorsi (Width & Flare)',
    secondaryMuscles: ['Biceps', 'Brachialis', 'Teres Major', 'Lower Trapezius', 'Core'],
    overview: 'The pinnacle bodyweight vertical pull that creates the coveted V-taper silhouette.',
    setupSteps: [
      'Grasp the pull-up bar with an overhand grip (pronated) slightly wider than shoulder width.',
      'Hang with arms fully extended into a dead hang. Engage your scapulae by pulling your shoulders down away from your ears.'
    ],
    executionSteps: [
      'Initiate the movement by driving elbows down toward your hips and chest up toward the bar.',
      'Pull until your chin clears the top edge of the bar and your upper chest approaches the bar.',
      'Pause briefly, then lower yourself under control back to a full dead hang stretch.'
    ],
    proTips: [
      'Avoid swinging your legs or kipping. Cross ankles and squeeze your glutes and abs tight.',
      'If you cannot yet perform full reps, use resistance band assistance or slow 5-second eccentric negatives.'
    ],
    commonMistakes: [
      'Cutting the bottom range of motion by stopping short at 90° elbow bend.',
      'Reaching forward with the chin instead of pulling the chest up to the bar.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '6 - 12 reps',
    defaultRestSec: 90
  },
  {
    id: 'lat-pulldown',
    name: 'Cable Lat Pulldown',
    category: 'Back',
    equipment: 'Cable',
    difficulty: 'Beginner',
    targetMuscle: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps Brachii', 'Teres Major', 'Rhomboids'],
    overview: 'A scalable vertical pulling movement ideal for hypertrophy volume and precise mind-muscle connection.',
    setupSteps: [
      'Adjust thigh pad firmly over your quads to anchor you down.',
      'Grasp the bar with an overhand grip 1.5x shoulder width. Sit down and lean torso back roughly 10-15°.'
    ],
    executionSteps: [
      'Depress scapulae and pull the bar down toward your clavicle / upper chest by driving elbows down.',
      'Squeeze lats firmly at the bottom for a split second.',
      'Allow the bar to return slowly overhead, feeling a deep stretch along the lateral edge of the back.'
    ],
    proTips: [
      'Use a thumbless "hook" grip to reduce forearm and bicep takeover.',
      'Lead with your elbows, not your hands.'
    ],
    commonMistakes: [
      'Leaning back 45° and turning the movement into a sloppy row.',
      'Pulling the bar behind the neck, which compromises cervical spine alignment.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '10 - 12 reps',
    defaultRestSec: 75
  },

  // LEGS - QUADS, GLUTES, HAMSTRINGS
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Quads',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    targetMuscle: 'Quadriceps Femoris & Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Calves', 'Erector Spinae', 'Core'],
    overview: 'The unrivaled king of lower-body development. Cultivates quad mass, glute strength, knee stability, and mental fortitude.',
    setupSteps: [
      'Step under the bar placed in the rack at mid-chest height. Rest bar across upper traps (high bar) or across rear delts (low bar).',
      'Grip the bar firmly, pull elbows down to brace your upper back. Unrack with two deliberate steps back.',
      'Set stance shoulder-width with toes turned out 15° to 30°. Take a deep diaphragmatic breath and brace core tight.'
    ],
    executionSteps: [
      'Break simultaneously at hips and knees, sitting down into the squat while actively spreading knees in line with toes.',
      'Descend until the crease of your hips drops below the top of your knees (parallel or below).',
      'Drive forcefully out of the hole by pushing through your whole foot (heel, big toe, pinky toe tripod), keeping chest upright to complete lockout.'
    ],
    proTips: [
      'Wear flat-soled shoes or elevated-heel lifting shoes to optimize ankle dorsiflexion and quad activation.',
      'Never lose abdominal intra-abdominal pressure at the bottom of the rep.'
    ],
    commonMistakes: [
      'Knees caving inward (knee valgus) on the ascent, signaling weak glute medius activation.',
      'Letting the torso collapse forward into a "good morning" squat, stressing the lower back.',
      'Cutting depth short before parallel.'
    ],
    recommendedSets: '4 - 5 sets',
    recommendedReps: '5 - 8 reps',
    defaultRestSec: 180
  },
  {
    id: 'romanian-deadlift',
    name: 'Barbell Romanian Deadlift (RDL)',
    category: 'Hamstrings & Glutes',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Hamstrings & Gluteus Maximus',
    secondaryMuscles: ['Erector Spinae', 'Adductor Magnus', 'Lats & Traps'],
    overview: 'The premier hip-hinge hypertrophy movement for loaded hamstring lengthening and glute sculpting.',
    setupSteps: [
      'Stand holding the barbell with an overhand grip at hip height, feet hip-width apart, knees softly unlocked.',
      'Lock your shoulder blades down into your back pockets and maintain a rigid, neutral spine.'
    ],
    executionSteps: [
      'Initiate the movement purely by pushing your hips backwards as if trying to touch a wall behind you with your glutes.',
      'Trace the barbell down your thighs and shins, keeping the bar glued to your legs.',
      'Stop when you feel a deep, intense stretch in your hamstrings (usually just below the kneecap).',
      'Drive hips forward and contract glutes hard to return to standing.'
    ],
    proTips: [
      'Knees stay at a constant, fixed soft angle; do not squat down.',
      'Think of your hips as a drawer being pushed shut rather than bending down towards the floor.'
    ],
    commonMistakes: [
      'Rounding the lumbar spine at the bottom to reach the floor rather than stopping at active hamstring range.',
      'Allowing the bar to drift away from the legs, shifting stress onto the lumbar spine.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '8 - 12 reps',
    defaultRestSec: 120
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'Quads',
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Quadriceps & Gluteus Medius/Maximus',
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core Stabilizers'],
    overview: 'The single most effective unilateral leg exercise for fixing strength asymmetries, hip mobility, and quad hypertrophy.',
    setupSteps: [
      'Stand roughly 2 to 3 feet in front of a flat bench. Place top of rear foot flat on the bench pad.',
      'Hold a dumbbell in each hand by your sides with chest proud and eyes focused forward.'
    ],
    executionSteps: [
      'Lower your hips straight down, allowing front knee to bend while rear knee drops toward the floor under control.',
      'Descend until your front thigh is parallel to the ground or rear knee is 1 inch off the floor.',
      'Drive through the heel and midfoot of the front leg to return to the starting position.'
    ],
    proTips: [
      'A slight forward torso lean emphasizes the glutes; an upright torso emphasizes the quads.',
      'Keep 85% of your weight distributed on the front leg; the rear leg is purely for balance.'
    ],
    commonMistakes: [
      'Front foot positioned too close to the bench, causing excessive heel lift.',
      'Pushing aggressively with the back leg rather than using the front leg engine.'
    ],
    recommendedSets: '3 sets per leg',
    recommendedReps: '10 - 12 reps',
    defaultRestSec: 90
  },
  {
    id: 'leg-press-machine',
    name: '45-Degree Incline Leg Press',
    category: 'Quads',
    equipment: 'Machine',
    difficulty: 'Beginner',
    targetMuscle: 'Quadriceps',
    secondaryMuscles: ['Glutes', 'Hamstrings', 'Adductors'],
    overview: 'High-load, spine-sparing quad overload machine that allows training to absolute muscular failure safely.',
    setupSteps: [
      'Sit with back and hips firmly pressed against the pads. Place feet shoulder-width on the platform.',
      'Release the safety catch handles and grip the side handles tightly.'
    ],
    executionSteps: [
      'Lower the sled slowly by flexing knees and hips until knees reach at least a 90° angle without your lower back peeling off the backrest.',
      'Press the platform back up through the midfoot and heels.',
      'Stop just shy of a harsh lockout to keep continuous tension on the quads.'
    ],
    proTips: [
      'Lower foot placement targets quads; higher foot placement recruits more glutes and hamstrings.',
      'Never let your butt lift off the seat at the bottom—this rounds the lumbar spine under heavy load.'
    ],
    commonMistakes: [
      'Violently snapping knees into hyperextended lockout at the top.',
      'Putting hands on knees to push the weight up rather than holding the side anchor handles.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '10 - 15 reps',
    defaultRestSec: 90
  },

  // SHOULDERS
  {
    id: 'overhead-barbell-press',
    name: 'Standing Barbell Overhead Press (OHP)',
    category: 'Shoulders',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Anterior Deltoid & Lateral Deltoid',
    secondaryMuscles: ['Triceps Brachii', 'Upper Trapezius', 'Serratus Anterior', 'Core'],
    overview: 'The definitive test of vertical pressing power and shoulder broadness. Demands total-body rigidity from toes to fingertips.',
    setupSteps: [
      'Set bar at collarbone height. Grip bar just outside shoulder width with forearms vertically aligned.',
      'Step under bar, rest it across anterior delts and clavicle. Unrack and take two small steps back into hip-width stance.',
      'Squeeze glutes, quads, and abs tight to build a rigid pillar.'
    ],
    executionSteps: [
      'Pull chin back slightly to clear the bar path. Press the barbell straight upward vertically.',
      'As soon as bar clears your forehead, move your head back forward through the "window" of your arms.',
      'Lock out overhead with arms fully extended, shrugging your traps up slightly at the top for scapular health.',
      'Lower under control back to the front rack position.'
    ],
    proTips: [
      'Squeeze your glutes as hard as possible; this locks your pelvis and prevents dangerous lower back arching.',
      'Keep your forearms perpendicular to the floor at the bottom of the movement.'
    ],
    commonMistakes: [
      'Excessive backward lean turning the lift into an impromptu incline bench press.',
      'Using leg dip (which turns it into a push press instead of a strict overhead press).'
    ],
    recommendedSets: '4 sets',
    recommendedReps: '5 - 8 reps',
    defaultRestSec: 150
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    targetMuscle: 'Lateral Deltoid (Shoulder Cap Width)',
    secondaryMuscles: ['Anterior Deltoid', 'Supraspinatus', 'Trapezius'],
    overview: 'The quintessential isolation movement for creating wide, boulder-capped 3D deltoids.',
    setupSteps: [
      'Stand tall with dumbbells at your sides, knees slightly bent, and torso tilted forward 5-10°.',
      'Hold weights with palms facing inward, elbows having a slight 15° fixed bend.'
    ],
    executionSteps: [
      'Raise dumbbells out to the sides in the scapular plane (approx 20-30° forward of the direct side).',
      'Lift until your arms are parallel to the floor, leading with the elbows.',
      'Hold for a split second, then lower slowly over 2-3 seconds resisting gravity.'
    ],
    proTips: [
      'Imagine pouring water from a pitcher at the top, or think of pushing the weights out toward the walls rather than up.',
      'Keep traps down; do not shrug your shoulders up to your ears.'
    ],
    commonMistakes: [
      'Swinging your hips and back to generate momentum with weights that are too heavy.',
      'Raising arms well above shoulder level, causing neck and trap dominance.'
    ],
    recommendedSets: '4 sets',
    recommendedReps: '12 - 18 reps',
    defaultRestSec: 60
  },
  {
    id: 'face-pull',
    name: 'Cable Face Pull with Rope',
    category: 'Shoulders',
    equipment: 'Cable',
    difficulty: 'Beginner',
    targetMuscle: 'Rear Deltoids & External Rotators (Infraspinatus, Teres Minor)',
    secondaryMuscles: ['Rhomboids', 'Middle & Lower Trapezius'],
    overview: 'The ultimate posture-correcting and shoulder-prehab builder that counteracts hunched desk posture and heavy pressing.',
    setupSteps: [
      'Attach a double-rope to a cable pulley positioned at eye level or slightly above.',
      'Grasp ends with a thumbs-backward or overhand grip and take two steps back to tension the cable.'
    ],
    executionSteps: [
      'Pull the center of the rope directly toward the bridge of your nose or forehead.',
      'Simultaneously rotate your hands outward and back, ending in a double-bicep flex pose with hands higher than elbows.',
      'Squeeze the rear shoulders and upper back for 1 full second, then return with control.'
    ],
    proTips: [
      'Focus on external rotation at the end of the pull; this activates the rotator cuff.',
      'Use moderate weight; this is a health and hypertrophy movement, not an ego-lifting exercise.'
    ],
    commonMistakes: [
      'Jerking the torso backwards to pull the weight.',
      'Pulling too low toward the chest, turning it into an upright row.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '15 - 20 reps',
    defaultRestSec: 60
  },

  // ARMS - BICEPS & TRICEPS
  {
    id: 'barbell-bicep-curl',
    name: 'Standing EZ-Bar Bicep Curl',
    category: 'Biceps',
    equipment: 'Barbell',
    difficulty: 'Beginner',
    targetMuscle: 'Biceps Brachii (Short & Long Heads)',
    secondaryMuscles: ['Brachialis', 'Brachioradialis', 'Forearm Flexors'],
    overview: 'Foundational arm hypertrophy builder using an EZ curl bar to relieve wrist torque while loading maximum weight.',
    setupSteps: [
      'Stand upright holding the angled inner grips of an EZ-bar with an underhand grip.',
      'Keep feet shoulder-width, core braced, and elbows tucked comfortably against your ribcage.'
    ],
    executionSteps: [
      'Curl the bar upwards by contracting biceps while keeping upper arms pinned stationary.',
      'Squeeze biceps hard at the peak near chest height without swinging elbows forward.',
      'Lower the bar slowly under strict control until arms are fully straightened.'
    ],
    proTips: [
      'Contract your triceps at the bottom of each rep to ensure a full stretch on the bicep before initiating the curl.',
      'Keep wrists straight or slightly flexed down, never bent back.'
    ],
    commonMistakes: [
      'Rocking back and forth from the hips to fling the weight up.',
      'Drifting elbows forward 6 inches, turning the top into a front delt exercise.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '8 - 12 reps',
    defaultRestSec: 75
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Bicep Curl',
    category: 'Biceps',
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Biceps Brachii Long Head (Peak)',
    secondaryMuscles: ['Brachialis', 'Forearms'],
    overview: 'Positions the shoulder in extension, placing the long head of the bicep under a profound stretch for maximum hypertrophy.',
    setupSteps: [
      'Set an incline bench to 45° to 60°. Sit back with head and back flat against the pad.',
      'Let dumbbells hang straight down at arm’s length with palms facing inward.'
    ],
    executionSteps: [
      'Curl the dumbbells up while supinating your wrists (turning palms up toward the ceiling).',
      'Squeeze the bicep at peak contraction without letting your elbows drift forward.',
      'Lower the weights slowly over 3 seconds back down into the fully stretched hang.'
    ],
    proTips: [
      'Do not rush out of the bottom stretch; that is where the highest growth signal occurs.',
      'Supinate hard so your pinky finger finishes slightly higher than your thumb.'
    ],
    commonMistakes: [
      'Lifting your head and shoulders off the bench to assist the lift.',
      'Using weights so heavy you cannot reach full elbow extension.'
    ],
    recommendedSets: '3 sets',
    recommendedReps: '10 - 12 reps',
    defaultRestSec: 60
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Triceps Rope Pushdown',
    category: 'Triceps',
    equipment: 'Cable',
    difficulty: 'Beginner',
    targetMuscle: 'Triceps Brachii (Lateral & Medial Heads)',
    secondaryMuscles: ['Anconeus', 'Core Stabilizers'],
    overview: 'High-tension tricep isolation exercise allowing deep elbow extension and outward flare for complete lateral head activation.',
    setupSteps: [
      'Attach a rope attachment to a high pulley. Grasp rope near the knotted ends.',
      'Step back slightly, lean torso forward 15°, and pin elbows tight by your ribs.'
    ],
    executionSteps: [
      'Extend your elbows downward until arms are completely straight.',
      'Spread the ends of the rope outward at the bottom, locking out your triceps with an intense contraction for 1 second.',
      'Allow the rope to rise under control until forearms reach parallel or slightly above.'
    ],
    proTips: [
      'Keep your upper arms completely frozen in space; only your forearms should move.',
      'Focus on pushing the rope ends toward the floor corners.'
    ],
    commonMistakes: [
      'Letting elbows flare forward and back like a chicken wing to use shoulder momentum.',
      'Rounding shoulders forward into a hunch.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '12 - 15 reps',
    defaultRestSec: 60
  },
  {
    id: 'skull-crushers',
    name: 'Lying EZ-Bar Skull Crushers',
    category: 'Triceps',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    targetMuscle: 'Triceps Brachii (Long Head)',
    secondaryMuscles: ['Lateral & Medial Triceps', 'Forearm Extensors'],
    overview: 'Premier overhead angle exercise targeting the meaty long head of the tricep which comprises the majority of arm size.',
    setupSteps: [
      'Lie flat on a bench holding an EZ-bar with hands close-grip on the inner angles.',
      'Extend arms up, then angle them slightly backward (approx 70-80° from the floor) to maintain continuous tension.'
    ],
    executionSteps: [
      'Bend at elbows to lower the bar toward the crown of your head or just behind the bench.',
      'Keep elbows pointed forward without letting them flare excessively outward.',
      'Extend elbows smoothly to push the bar back to the starting angled position.'
    ],
    proTips: [
      'Lowering the bar slightly behind your head (rather than directly to forehead) puts less shear force on the elbow tendons and yields a deeper long-head stretch.'
    ],
    commonMistakes: [
      'Letting the elbows drift forward over the chest, taking all tension off the triceps.',
      'Dropping the bar too quickly near the face.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '8 - 12 reps',
    defaultRestSec: 90
  },

  // ABS & CORE
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'Abs & Core',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    targetMuscle: 'Rectus Abdominis (Lower Emphasis) & Hip Flexors',
    secondaryMuscles: ['Obliques', 'Forearm Grip', 'Serratus Anterior'],
    overview: 'The pinnacle gymnastic core movement that posterior-pelvic tilts the hips to sculpt dense, defined abdominal ridges.',
    setupSteps: [
      'Hang from a sturdy pull-up bar with an overhand grip, arms fully extended.',
      'Engage your lats and keep your legs straight together or with a slight knee bend.'
    ],
    executionSteps: [
      'Exhale completely as you curl your pelvis upward and lift your legs until they are at least parallel to the floor (or touching the bar).',
      'Pause at the peak contraction for a count, squeezing your lower abs.',
      'Lower your legs slowly over 3 seconds without swinging.'
    ],
    proTips: [
      'Do not just lift your legs; actively curl your pelvis toward your ribcage (posterior pelvic tilt).',
      'If you start swinging, pause at the bottom to reset before the next repetition.'
    ],
    commonMistakes: [
      'Swinging wildly using momentum instead of muscular abdominal contraction.',
      'Only flexing at the hip joint without curling the pelvis, working only hip flexors.'
    ],
    recommendedSets: '3 - 4 sets',
    recommendedReps: '10 - 15 reps',
    defaultRestSec: 60
  },
  {
    id: 'cable-woodchoppers',
    name: 'Standing Cable Woodchopper',
    category: 'Abs & Core',
    equipment: 'Cable',
    difficulty: 'Beginner',
    targetMuscle: 'External & Internal Obliques',
    secondaryMuscles: ['Transverse Abdominis', 'Shoulders', 'Glutes'],
    overview: 'Dynamic rotational power and anti-rotation core stability movement essential for athletic performance and waist taper.',
    setupSteps: [
      'Set cable pulley to high position with a single handle attached.',
      'Stand sideways to the machine, feet wider than shoulder width. Grasp the handle with both hands.'
    ],
    executionSteps: [
      'Pull the cable downward and across your body toward your opposite hip by rotating your torso and pivoting your back foot.',
      'Keep arms mostly straight with a soft elbow bend.',
      'Control the weight back to the high starting position, resisting the rotation.'
    ],
    proTips: [
      'Generate torque from the hips and core, not by pulling with your arm muscles.',
      'Pivot your rear foot like swinging a baseball bat.'
    ],
    commonMistakes: [
      'Bending and extending the arms, turning it into a tricep pushdown.',
      'Locking feet completely in place, twisting the knee.'
    ],
    recommendedSets: '3 sets per side',
    recommendedReps: '12 - 15 reps',
    defaultRestSec: 60
  },

  // CALVES
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    category: 'Calves',
    equipment: 'Machine',
    difficulty: 'Beginner',
    targetMuscle: 'Gastrocnemius (Outer Calf)',
    secondaryMuscles: ['Soleus', 'Achilles Tendon', 'Foot Intrinsic Muscles'],
    overview: 'High-load straight-leg calf exercise that maximally loads the two-joint gastrocnemius muscle at full stretch.',
    setupSteps: [
      'Place balls of feet on the edge of the calf block, heels hanging off freely.',
      'Position shoulder pads comfortably and stand up straight with knees fully locked.'
    ],
    executionSteps: [
      'Lower your heels deep down toward the floor until you feel a profound stretch through the Achilles and calf.',
      'Hold the bottom stretch for 2 full seconds to dissipate the elastic stretch reflex.',
      'Drive up as high as possible onto the balls of your feet and squeeze your calves hard for 1 second.'
    ],
    proTips: [
      'The 2-second pause at the bottom is the secret to calf growth—it forces the muscle fibers to do the work rather than the springy Achilles tendon.',
      'Push through the big toe knuckle for optimal inner and outer head recruitment.'
    ],
    commonMistakes: [
      'Rapidly bouncing up and down like a trampoline.',
      'Bending the knees to bounce the weight up.'
    ],
    recommendedSets: '4 sets',
    recommendedReps: '12 - 20 reps',
    defaultRestSec: 60
  }
];
