import { 
  User, 
  CustomerRole, 
  LearningGoal, 
  WeeklyFrequency, 
  LearningExperience 
} from "@/contexts/AuthContext";

export type ContentFormat = "audio" | "interactive" | "text" | "video";
export type LearningLevel = "beginner" | "intermediate" | "advanced";

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: LearningCourse[];
  tags: string[];
  totalDuration: number; // in minutes
}

export interface LearningCourse {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  format: ContentFormat;
  level: LearningLevel;
  category: string;
  image: string;
  progress?: number;
  audioUrl?: string; // URL to audio file
  audioContent?: string; // Text content for audio narration
  videoUrl?: string; // URL to video file
}

const allCourses: LearningCourse[] = [
  {
    id: 1,
    title: "Introduction to AI Concepts",
    description: "Learn the fundamentals of artificial intelligence and how it's transforming industries",
    category: "Fundamentals",
    level: "beginner",
    format: "audio",
    duration: 15,
    progress: 45,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103652.png",
    audioUrl: "https://storage.googleapis.com/aicontent/samples/ai_introduction.mp3",
    audioContent: `Welcome to Introduction to AI Concepts. In this 15-minute session, we'll explore the fundamental concepts of artificial intelligence.
    
    Artificial Intelligence, or AI, refers to systems designed to perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.
    
    The field of AI encompasses several subfields. Machine Learning enables computers to learn from data without explicit programming. Deep Learning uses neural networks with many layers to analyze complex patterns. Natural Language Processing allows computers to understand and generate human language. Computer Vision helps machines interpret and make decisions based on visual information.
    
    AI technologies are transforming various industries. In healthcare, AI assists in diagnosis, drug discovery, and personalized treatment plans. In finance, it powers fraud detection, algorithmic trading, and risk assessment. Manufacturing benefits from predictive maintenance and quality control systems. Transportation is being revolutionized by autonomous vehicles and traffic optimization.
    
    However, AI development comes with important ethical considerations. We must address issues of bias in algorithms, ensure transparency in decision-making processes, protect privacy, and consider the impact of automation on employment.
    
    As we continue to advance AI technologies, responsible innovation will be key to maximizing benefits while minimizing potential risks.`
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    description: "Understand the core principles behind machine learning models",
    category: "Machine Learning",
    level: "beginner",
    format: "interactive",
    duration: 10,
    progress: 20,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    audioContent: `Welcome to Machine Learning Basics. In this 10-minute session, we'll cover the fundamental principles of machine learning.
    
    Machine learning is a subset of artificial intelligence that gives systems the ability to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.
    
    There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning.
    
    In supervised learning, algorithms learn from labeled training data and make predictions based on that data. Common applications include image classification, spam detection, and predictive analytics.
    
    Unsupervised learning works with unlabeled data to find patterns or intrinsic structures. Clustering and association are common techniques used in market segmentation, social network analysis, and anomaly detection.
    
    Reinforcement learning involves an agent learning to behave in an environment by performing actions and receiving rewards or penalties. This approach is used in robotics, gaming, and resource management.
    
    The machine learning workflow typically involves data collection, preprocessing, feature selection, model selection, training, validation, and deployment. Each step is crucial for developing effective models.
    
    As we move forward, we'll explore these concepts in greater depth and learn how to implement them in real-world scenarios.`
  },
  {
    id: 3,
    title: "Neural Networks 101",
    description: "Interactive introduction to neural networks with visual examples",
    category: "Deep Learning",
    level: "intermediate",
    format: "interactive",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103674.png",
    audioContent: `Welcome to Neural Networks 101. In this 15-minute session, we'll explore the fascinating world of neural networks, the backbone of deep learning.
    
    Neural networks are computing systems inspired by the biological neural networks in animal brains. They consist of artificial neurons organized in layers, designed to recognize patterns and solve complex problems.
    
    The basic structure of a neural network includes an input layer, one or more hidden layers, and an output layer. Each connection between neurons has a weight that adjusts as the network learns.
    
    The process begins when the input layer receives data. This data is then passed through the network, with each neuron applying an activation function to determine whether it should "fire" and pass information to the next layer. The output layer produces the final result.
    
    Training a neural network involves feeding it data, comparing its output to the expected result, and adjusting the weights to minimize the difference. This process, called backpropagation, is repeated many times until the network achieves satisfactory performance.
    
    Different types of neural networks serve various purposes. Convolutional Neural Networks excel at image recognition. Recurrent Neural Networks are ideal for sequential data like language. Generative Adversarial Networks can create new content based on learned patterns.
    
    Neural networks have enabled breakthroughs in computer vision, natural language processing, speech recognition, and many other fields, fundamentally changing how we approach complex problems in computing.`
  },
  {
    id: 4,
    title: "Ethical AI and Responsible Development",
    description: "Learn about ethical considerations in AI development",
    category: "Ethics",
    level: "beginner",
    format: "audio",
    duration: 10,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103618.png",
    audioUrl: "https://storage.googleapis.com/aicontent/samples/ethical_ai.mp3",
    audioContent: `Welcome to Ethical AI and Responsible Development. In this 10-minute session, we'll explore the crucial ethical considerations in AI development.
    
    As artificial intelligence becomes increasingly integrated into our society, ensuring its ethical development and deployment is paramount. Ethical AI refers to the practice of designing, developing, and deploying AI systems that are fair, transparent, accountable, and respectful of human rights.
    
    A primary concern is algorithmic bias. AI systems learn from historical data, which may contain existing biases or reflect societal inequalities. When these biases are perpetuated or amplified by AI, they can lead to discriminatory outcomes in hiring, lending, criminal justice, and other critical areas.
    
    Transparency is another key principle. "Black box" AI systems make decisions that even their creators may not fully understand. This lack of explainability raises concerns, especially in high-stakes contexts like healthcare or autonomous vehicles.
    
    Privacy is also a major ethical consideration. AI systems often require vast amounts of data, raising questions about consent, data ownership, and potential surveillance.
    
    Additionally, we must consider the impact of AI on employment and economic inequality. As automation replaces certain jobs, how do we ensure economic opportunities remain accessible to all?
    
    Responsible AI development requires diverse teams, rigorous testing, ongoing monitoring, and clear guidelines for intervention when systems don't perform as intended. By prioritizing ethics from the start, we can harness AI's potential while minimizing harm.`
  },
  {
    id: 5,
    title: "Natural Language Processing",
    description: "Explore how AI understands and processes human language",
    category: "NLP",
    level: "intermediate",
    format: "interactive",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103666.png",
    audioContent: `Welcome to Natural Language Processing. In this 15-minute session, we'll explore how AI understands and processes human language.
    
    Natural Language Processing, or NLP, is a field at the intersection of computer science, artificial intelligence, and linguistics. It focuses on the interaction between computers and human language, enabling machines to read, understand, and derive meaning from text and speech.
    
    The journey of NLP begins with text preprocessing, which includes tokenization (breaking text into words or phrases), removing stopwords, stemming, and lemmatization. These steps prepare the text for further analysis.
    
    Traditional NLP approaches relied heavily on rule-based systems and statistical methods. However, modern NLP has been revolutionized by deep learning, particularly through transformer models like BERT, GPT, and T5, which have achieved remarkable results across various language tasks.
    
    NLP encompasses several key applications. Sentiment analysis determines the emotional tone behind text, useful for understanding customer opinions. Named entity recognition identifies entities like names, dates, and locations in text. Machine translation converts text from one language to another. Question answering systems provide specific answers to natural language questions.
    
    The challenges in NLP include understanding context, dealing with ambiguity, handling different languages and dialects, and addressing biases in language data. Despite these challenges, NLP continues to advance rapidly, enabling more natural and effective human-computer interaction.
    
    As we move forward, we'll explore specific NLP techniques and how they're applied in real-world scenarios.`
  },
  {
    id: 6,
    title: "Computer Vision Fundamentals",
    description: "Audio walkthrough of how AI sees and interprets visual information",
    category: "Computer Vision",
    level: "intermediate",
    format: "audio",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103650.png",
    audioUrl: "https://storage.googleapis.com/aicontent/samples/computer_vision.mp3",
    audioContent: `Welcome to Computer Vision Fundamentals. In this 15-minute session, we'll explore how AI systems see and interpret visual information.
    
    Computer Vision is a field of artificial intelligence that enables computers to derive meaningful information from digital images, videos, and other visual inputs. Essentially, it aims to replicate the capabilities of human vision and then take actions or make recommendations based on that information.
    
    The process begins with image acquisition, where digital images are captured and stored. These images then undergo preprocessing, which may include noise reduction, enhancement, and normalization to prepare them for analysis.
    
    Feature extraction identifies key points, edges, textures, and other distinctive aspects of the image. These features serve as the foundation for higher-level understanding. Image segmentation divides an image into multiple segments or objects, helping to simplify the image and make it easier to analyze.
    
    Object detection locates and classifies objects within an image, often using bounding boxes to indicate their position. Image classification assigns a label to an entire image based on its content. Instance segmentation goes further by identifying each instance of each object and providing pixel-level precision.
    
    Modern computer vision relies heavily on deep learning, particularly Convolutional Neural Networks (CNNs), which have dramatically improved performance across various vision tasks. These networks automatically learn hierarchical features from images, from simple edges to complex objects.
    
    Applications of computer vision are vast and growing. They include facial recognition, autonomous vehicles, medical image analysis, surveillance, augmented reality, and industrial quality control.
    
    As we proceed, we'll delve deeper into specific computer vision techniques and their real-world applications.`
  },
  {
    id: 7,
    title: "Reinforcement Learning",
    description: "Interactive examples of how AI learns through trial and error",
    category: "Machine Learning",
    level: "advanced",
    format: "interactive",
    duration: 10,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103658.png",
    audioContent: `Welcome to Reinforcement Learning. In this 10-minute session, we'll explore how AI learns through trial and error.
    
    Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by taking actions in an environment to maximize some notion of cumulative reward. Unlike supervised learning, the agent isn't explicitly told which actions to take but must discover which actions yield the most reward through trial and error.
    
    The core components of reinforcement learning include: the agent (the decision-maker), the environment (what the agent interacts with), actions (what the agent can do), states (situations the agent finds itself in), and rewards (feedback from the environment).
    
    The learning process involves the agent observing the current state, taking an action, receiving a reward or penalty, and transitioning to a new state. This process creates a feedback loop where the agent learns to associate states and actions with their eventual outcomes.
    
    A key concept in RL is the exploration-exploitation trade-off. The agent must balance exploring new actions to discover potentially better rewards versus exploiting known actions that yield good rewards.
    
    Common algorithms in reinforcement learning include Q-learning, which creates a table of state-action values; Deep Q Networks (DQN), which use neural networks to approximate the Q-function for complex environments; and Policy Gradient methods, which directly optimize the policy without using a value function.
    
    Reinforcement learning has achieved remarkable successes in various domains, including game playing (AlphaGo), robotics, autonomous vehicles, finance, and resource management. However, it also faces challenges like sample inefficiency, the need for careful reward design, and difficulty in environments with sparse rewards.
    
    As we continue, we'll explore how reinforcement learning is applied to solve complex real-world problems.`
  },
  {
    id: 8,
    title: "AI for Business Decision Making",
    description: "Learn how businesses implement AI for better outcomes",
    category: "Business",
    level: "beginner",
    format: "audio",
    duration: 10,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103611.png",
    audioUrl: "https://storage.googleapis.com/aicontent/samples/ai_business.mp3",
    audioContent: `Welcome to AI for Business Decision Making. In this 10-minute session, we'll explore how businesses implement AI to achieve better outcomes.
    
    Artificial Intelligence is transforming business decision-making by analyzing vast amounts of data, identifying patterns, and making predictions with unprecedented accuracy and speed. This enables organizations to make more informed decisions, optimize operations, and gain competitive advantages.
    
    One key application is predictive analytics, which uses historical data to forecast future trends, customer behavior, and market conditions. This helps businesses anticipate changes and proactively respond to opportunities and challenges.
    
    AI also enhances customer relationship management by personalizing experiences, automating interactions through chatbots, and identifying customer needs before they're explicitly expressed. This leads to improved customer satisfaction and loyalty.
    
    In operations, AI optimizes processes through intelligent automation, supply chain management, and resource allocation. These improvements reduce costs and increase efficiency across the organization.
    
    Risk management benefits from AI's ability to detect fraud, assess credit worthiness, and identify potential compliance issues. By analyzing patterns and anomalies in real-time, AI helps businesses mitigate risks before they lead to significant problems.
    
    However, implementing AI in business requires careful consideration of data quality, integration with existing systems, talent acquisition, and ethical implications. Organizations must develop clear strategies that align AI initiatives with business objectives.
    
    As we proceed, we'll explore specific case studies of successful AI implementation in various industries and discuss best practices for leveraging AI in business contexts.`
  },
  {
    id: 9,
    title: "Computer Vision with Deep Learning",
    description: "A video tutorial on implementing advanced computer vision techniques with deep learning",
    category: "Deep Learning",
    level: "advanced",
    format: "video",
    duration: 20,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103674.png",
    videoUrl: "https://www.youtube.com/watch?v=ad79nYk2keg"
  },
  {
    id: 10,
    title: "Practical NLP Applications",
    description: "Video course on building practical NLP applications in various domains",
    category: "NLP",
    level: "intermediate",
    format: "video",
    duration: 25,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103666.png",
    videoUrl: "https://www.youtube.com/watch?v=TdfTsQD5z3s"
  },
  {
    id: 11,
    title: "AI Career Guide",
    description: "Learn about various career paths in AI and how to prepare for them",
    category: "Career",
    level: "beginner",
    format: "video",
    duration: 18,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103611.png",
    videoUrl: "https://www.youtube.com/watch?v=2gPqU_CV9ZY"
  },
  {
    id: 12,
    title: "Introduction to Generative AI",
    description: "Learn the fundamentals of generative AI models and their applications",
    category: "Fundamentals",
    level: "intermediate",
    format: "video",
    duration: 15,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103652.png",
    videoUrl: "https://www.youtube.com/watch?v=hfIUstzHs9A"
  },
  {
    id: 13,
    title: "AI Ethics and Governance",
    description: "Understanding the ethical implications and governance frameworks for AI",
    category: "Ethics",
    level: "intermediate",
    format: "video",
    duration: 22,
    progress: 0,
    image: "https://cdn-icons-png.flaticon.com/512/2103/2103618.png",
    videoUrl: "https://www.youtube.com/watch?v=dvzAm-g4yBM"
  }
];

const predefinedPaths: LearningPath[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "A comprehensive introduction to artificial intelligence concepts",
    courses: [allCourses[0], allCourses[1], allCourses[3]],
    tags: ["beginner", "fundamentals", "ethics"],
    totalDuration: 35
  },
  {
    id: "ml-specialist",
    title: "Machine Learning Specialist",
    description: "Deep dive into machine learning concepts and applications",
    courses: [allCourses[1], allCourses[6], allCourses[2]],
    tags: ["machine learning", "advanced", "reinforcement learning"],
    totalDuration: 35
  },
  {
    id: "business-ai",
    title: "AI for Business",
    description: "Practical AI applications for business professionals",
    courses: [allCourses[7], allCourses[0], allCourses[3]],
    tags: ["business", "ethics", "decision making"],
    totalDuration: 35
  },
  {
    id: "ai-specialist",
    title: "AI Specialist Track",
    description: "Advanced topics in AI across multiple domains",
    courses: [allCourses[2], allCourses[4], allCourses[5]],
    tags: ["intermediate", "neural networks", "computer vision", "nlp"],
    totalDuration: 45
  }
];

export const getRecommendedPath = (user: User | null): LearningPath | null => {
  if (!user?.preferences) return null;
  
  const { learningGoal, learningExperience, customerRole } = user.preferences;
  
  let recommendedPathId = "";
  
  if (customerRole) {
    switch (customerRole) {
      case "developer":
      case "ai_engineer":
        recommendedPathId = "ml-specialist";
        break;
      case "data_analyst":
      case "data_engineer":
        recommendedPathId = "ai-specialist";
        break;
      case "administrator":
      case "it":
      case "security_engineer":
        recommendedPathId = "business-ai";
        break;
      case "solution_architect":
        recommendedPathId = learningGoal === "professional" ? "ai-specialist" : "ai-fundamentals";
        break;
      case "student":
        recommendedPathId = "ai-fundamentals";
        break;
      default:
        switch (learningGoal) {
          case "casual":
            recommendedPathId = "ai-fundamentals";
            break;
          case "professional":
            recommendedPathId = "ai-specialist";
            break;
          case "skill":
            recommendedPathId = "ml-specialist";
            break;
          default:
            recommendedPathId = "ai-fundamentals";
        }
    }
  } else {
    switch (learningGoal) {
      case "casual":
        recommendedPathId = "ai-fundamentals";
        break;
      case "professional":
        recommendedPathId = "ai-specialist";
        break;
      case "skill":
        recommendedPathId = "ml-specialist";
        break;
      default:
        recommendedPathId = "ai-fundamentals";
    }
  }
  
  let recommendedPath = predefinedPaths.find(path => path.id === recommendedPathId);
  if (!recommendedPath) return null;
  
  if (learningExperience) {
    const customizedPath = {
      ...recommendedPath,
      courses: [...recommendedPath.courses]
    };
    
    let preferredFormats: ContentFormat[] = [];
    switch (learningExperience) {
      case "voice":
        preferredFormats = ["audio"];
        break;
      case "interactive":
        preferredFormats = ["interactive"];
        break;
      case "both":
        preferredFormats = ["audio", "interactive", "video"];
        break;
    }
    
    const preferredCourses = allCourses.filter(course => 
      preferredFormats.includes(course.format) && 
      !customizedPath.courses.some(c => c.id === course.id)
    );
    
    if (preferredCourses.length > 0) {
      customizedPath.courses = [
        ...customizedPath.courses,
        ...preferredCourses.slice(0, 2)
      ];
      
      customizedPath.totalDuration = customizedPath.courses.reduce(
        (total, course) => total + course.duration, 0
      );
    }
    
    return customizedPath;
  }
  
  return recommendedPath;
};

export const getRecommendedCourses = (user: User | null, limit: number = 3): LearningCourse[] => {
  if (!user?.preferences) return allCourses.slice(0, limit);
  
  const { learningExperience, customerRole, targetTime } = user.preferences;
  let filteredCourses = [...allCourses];
  
  if (customerRole) {
    switch (customerRole) {
      case "developer":
      case "ai_engineer":
        filteredCourses.sort((a, b) => {
          const aTags = ["code", "machine learning", "neural networks"];
          const bTags = ["code", "machine learning", "neural networks"];
          return aTags.includes(a.category.toLowerCase()) && !bTags.includes(b.category.toLowerCase()) ? -1 : 1;
        });
        break;
      case "data_analyst":
      case "data_engineer":
        filteredCourses.sort((a, b) => {
          const aTags = ["data", "nlp", "machine learning"];
          const bTags = ["data", "nlp", "machine learning"];
          return aTags.includes(a.category.toLowerCase()) && !bTags.includes(b.category.toLowerCase()) ? -1 : 1;
        });
        break;
    }
  }
  
  if (targetTime) {
    filteredCourses.sort((a, b) => {
      const aTimeDiff = Math.abs(a.duration - targetTime);
      const bTimeDiff = Math.abs(b.duration - targetTime);
      return aTimeDiff - bTimeDiff;
    });
  }
  
  if (learningExperience) {
    let preferredFormats: ContentFormat[] = [];
    switch (learningExperience) {
      case "voice":
        preferredFormats = ["audio"];
        break;
      case "interactive":
        preferredFormats = ["interactive", "video"];
        break;
      case "both":
        preferredFormats = ["audio", "interactive", "video"];
        break;
    }
    
    filteredCourses.sort((a, b) => {
      if (preferredFormats.includes(a.format) && !preferredFormats.includes(b.format)) return -1;
      if (!preferredFormats.includes(a.format) && preferredFormats.includes(b.format)) return 1;
      return 0;
    });
  }
  
  return filteredCourses.slice(0, limit);
};

export const getAllCourses = (): LearningCourse[] => {
  return allCourses;
};
