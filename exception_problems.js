// exception_problems.js
// PDF3: 15 Practice Questions - Exceptions
// PDF4: 18 Practice Programs - Exception Handling
// Total: 33 problems

const EXCEPTION_PROBLEMS = [

  // ═══════════════════════════════════════════
  // PDF 3 — Practice Questions: Exceptions
  // ═══════════════════════════════════════════

  {
    id: 'e1', title: 'Safe Division for a Score Calculator',
    difficulty: 'Easy', source: 'PDF 3 — Q1',
    tags: ['try-catch', 'ArithmeticException'],
    description: `<p>A score-analysis program receives two integer values and calculates the quotient of the first divided by the second.</p>
<ul>
  <li>If the operation is valid, display the quotient.</li>
  <li>If the divisor is zero, handle the error and display: <code>Invalid Division</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">4</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Division</span></div></div>`,
    hint: `<ul>
  <li>Read two integers from input.</li>
  <li>Place the division inside a <code>try</code> block.</li>
  <li>Catch <code>ArithmeticException</code> — Java throws this automatically on integer division by zero.</li>
  <li>Print the result if no exception, or the error message in the catch block.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        try {
            System.out.println(a / b);
        } catch (ArithmeticException e) {
            System.out.println("Invalid Division");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        // TODO: Use try-catch to handle division by zero
        sc.close();
    }
}`,
    testCases: [
      { input: '20 5',  expected: '4',                description: 'Valid division' },
      { input: '20 0',  expected: 'Invalid Division', description: 'Division by zero' },
      { input: '100 4', expected: '25',               description: 'Clean division' },
      { input: '7 2',   expected: '3',                description: 'Integer division rounds down' },
      { input: '0 5',   expected: '0',                description: 'Zero dividend' },
    ]
  },

  {
    id: 'e2', title: 'Detect Invalid Remainder Operation',
    difficulty: 'Easy', source: 'PDF 3 — Q2',
    tags: ['try-catch', 'ArithmeticException', '%'],
    description: `<p>A utility program calculates the remainder when one number is divided by another.</p>
<ul>
  <li>For a valid divisor, print the remainder.</li>
  <li>If the divisor is zero, handle the error and display: <code>Remainder Error</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">17 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">2</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">17 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Remainder Error</span></div></div>`,
    hint: `<ul>
  <li>Use the <code>%</code> operator inside a <code>try</code> block.</li>
  <li>The <code>%</code> operator also throws <code>ArithmeticException</code> when the second operand is zero.</li>
  <li>Catch the exception and print the error message.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        try {
            System.out.println(x % y);
        } catch (ArithmeticException e) {
            System.out.println("Remainder Error");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        // TODO: Use try-catch to handle remainder by zero
        sc.close();
    }
}`,
    testCases: [
      { input: '17 5', expected: '2',              description: '17 % 5 = 2' },
      { input: '17 0', expected: 'Remainder Error', description: 'Zero divisor' },
      { input: '10 3', expected: '1',              description: '10 % 3 = 1' },
      { input: '9 9',  expected: '0',              description: 'Same values, remainder 0' },
      { input: '0 5',  expected: '0',              description: '0 % 5 = 0' },
    ]
  },

  {
    id: 'e3', title: 'Guaranteed Completion Message',
    difficulty: 'Easy', source: 'PDF 3 — Q3',
    tags: ['try-catch-finally', 'finally'],
    description: `<p>A data-processing application performs a division operation.</p>
<ul>
  <li>Display the quotient when the calculation succeeds.</li>
  <li>If division by zero occurs, print <code>Calculation Error</code>.</li>
  <li>Regardless of what happens, always print: <code>Operation Finished</code></li>
</ul>
<p>The final message <strong>must</strong> be produced using a <code>finally</code> block.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">30 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">6<br>Operation Finished</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">30 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Calculation Error<br>Operation Finished</span></div></div>`,
    hint: `<ul>
  <li>Use <code>try</code> → division, <code>catch</code> → arithmetic error, <code>finally</code> → unconditional completion message.</li>
  <li>The <code>finally</code> block runs after both the try block and any catch block, no matter what.</li>
  <li>Two lines of output: the result (or error), then "Operation Finished".</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();
        int parts = sc.nextInt();
        try {
            System.out.println(total / parts);
        } catch (ArithmeticException e) {
            System.out.println("Calculation Error");
        } finally {
            System.out.println("Operation Finished");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();
        int parts = sc.nextInt();
        // TODO: Use try-catch-finally
        // finally must print "Operation Finished"
        sc.close();
    }
}`,
    testCases: [
      { input: '30 5', expected: '6\nOperation Finished',                description: 'Valid: quotient then finally' },
      { input: '30 0', expected: 'Calculation Error\nOperation Finished', description: 'Zero: error then finally' },
      { input: '100 4', expected: '25\nOperation Finished',              description: 'Clean division' },
      { input: '7 2',  expected: '3\nOperation Finished',               description: 'Integer division' },
      { input: '0 5',  expected: '0\nOperation Finished',               description: 'Zero dividend' },
    ]
  },

  {
    id: 'e4', title: 'Safe Array Position Lookup',
    difficulty: 'Easy', source: 'PDF 3 — Q4',
    tags: ['ArrayIndexOutOfBoundsException', 'array'],
    description: `<p>A sports application stores player scores in an integer array.</p>
<p>The user provides <strong>n</strong> scores, then a position. Display the score at that position.</p>
<p>If the position is outside the valid range, display: <code>Invalid Position</code></p>
<p>Use exception handling — do <strong>not</strong> manually check the index.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 20 30 40 50<br>2</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">30</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 20 30 40 50<br>7</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Position</span></div></div>`,
    hint: `<ul>
  <li>Read n, then n integers into the array, then read the position.</li>
  <li>Access <code>scores[position]</code> inside a <code>try</code> block.</li>
  <li>Catch <code>ArrayIndexOutOfBoundsException</code>.</li>
  <li>Valid indexes are 0 to n-1. Anything else triggers the exception.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] scores = new int[n];
        for (int i = 0; i < n; i++) scores[i] = sc.nextInt();
        int position = sc.nextInt();
        try {
            System.out.println(scores[position]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid Position");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] scores = new int[n];
        for (int i = 0; i < n; i++) scores[i] = sc.nextInt();
        int position = sc.nextInt();
        // TODO: Access scores[position] inside try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: '5\n10 20 30 40 50\n2', expected: '30',              description: 'Valid index 2' },
      { input: '5\n10 20 30 40 50\n7', expected: 'Invalid Position', description: 'Out of bounds index 7' },
      { input: '3\n5 10 15\n0',         expected: '5',              description: 'First element' },
      { input: '3\n5 10 15\n2',         expected: '15',             description: 'Last element' },
      { input: '3\n5 10 15\n-1',        expected: 'Invalid Position', description: 'Negative index' },
    ]
  },

  {
    id: 'e5', title: 'Explicitly Reject an Invalid Request',
    difficulty: 'Easy', source: 'PDF 3 — Q5',
    tags: ['throw', 'Exception'],
    description: `<p>A cinema booking system allows a customer to reserve at most <strong>4</strong> seats in a single request.</p>
<ul>
  <li>If the requested number exceeds 4, the program must <strong>explicitly throw</strong> an exception with the message: <code>Seat Limit Exceeded</code></li>
  <li>Otherwise display: <code>Booking Confirmed</code></li>
</ul>
<p>Use <code>throw</code> and <code>try-catch</code>.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">3</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Booking Confirmed</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Seat Limit Exceeded</span></div></div>`,
    hint: `<ul>
  <li>Java doesn't automatically generate this exception — you must use <code>throw</code>.</li>
  <li>Inside the try block: <code>if (seats > 4) throw new Exception("Seat Limit Exceeded");</code></li>
  <li>In the catch block: print <code>e.getMessage()</code>.</li>
  <li>This is the key difference: <strong>automatic</strong> exceptions vs <strong>explicit</strong> throw.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int seats = sc.nextInt();
        try {
            if (seats > 4) throw new Exception("Seat Limit Exceeded");
            System.out.println("Booking Confirmed");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int seats = sc.nextInt();
        // TODO: throw an Exception if seats > 4
        sc.close();
    }
}`,
    testCases: [
      { input: '3', expected: 'Booking Confirmed',  description: 'Valid: 3 seats' },
      { input: '6', expected: 'Seat Limit Exceeded', description: 'Exceeds limit of 4' },
      { input: '4', expected: 'Booking Confirmed',  description: 'Exactly at limit' },
      { input: '5', expected: 'Seat Limit Exceeded', description: 'One over limit' },
      { input: '1', expected: 'Booking Confirmed',  description: 'Single seat' },
    ]
  },

  {
    id: 'e6', title: 'Propagate an Arithmetic Exception',
    difficulty: 'Easy', source: 'PDF 3 — Q6',
    tags: ['throws', 'ArithmeticException', 'propagation'],
    description: `<p>Create a method:</p>
<div class="example-block"><div class="ex-val"><code>static int findAverage(int total, int students)</code></div></div>
<p>The method calculates <code>total / students</code>. Do <strong>not</strong> handle the exception inside this method. Instead, declare it with <code>throws</code> and handle it in <code>main()</code>.</p>
<p>When the number of students is zero, print: <code>Average Cannot Be Calculated</code></p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">100 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">20</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">100 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Average Cannot Be Calculated</span></div></div>`,
    hint: `<ul>
  <li>Declare the method with: <code>throws ArithmeticException</code></li>
  <li>Just perform the division inside the method — let Java automatically throw the exception.</li>
  <li>In <code>main()</code>, call the method inside a <code>try-catch</code> block.</li>
  <li><code>throws</code> = declares a method may pass an exception to its caller.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static int findAverage(int total, int students) throws ArithmeticException {
        return total / students;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();
        int students = sc.nextInt();
        try {
            System.out.println(findAverage(total, students));
        } catch (ArithmeticException e) {
            System.out.println("Average Cannot Be Calculated");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    // TODO: Declare the method with throws ArithmeticException
    static int findAverage(int total, int students) {
        return 0; // fix this
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();
        int students = sc.nextInt();
        // TODO: Call findAverage inside try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: '100 5', expected: '20',                           description: 'Valid average' },
      { input: '100 0', expected: 'Average Cannot Be Calculated', description: 'Zero students' },
      { input: '90 3',  expected: '30',                           description: '90/3=30' },
      { input: '0 5',   expected: '0',                            description: 'Zero total' },
      { input: '50 7',  expected: '7',                            description: 'Integer division: 50/7=7' },
    ]
  },

  {
    id: 'e7', title: 'Custom Exception for Invalid Temperature',
    difficulty: 'Medium', source: 'PDF 3 — Q7',
    tags: ['custom exception', 'throws', 'extends Exception'],
    description: `<p>A weather application accepts a temperature in Celsius. Temperatures below <strong>-90</strong> or above <strong>60</strong> are invalid.</p>
<p>Create a user-defined exception named <code>TemperatureException</code>.</p>
<ul>
  <li>For invalid input, print: <code>Invalid Temperature</code></li>
  <li>For valid input, print: <code>Temperature Accepted</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">25</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Temperature Accepted</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">75</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Temperature</span></div></div>`,
    hint: `<ul>
  <li>Create the custom exception: <code>class TemperatureException extends Exception { ... }</code></li>
  <li>In the constructor, call <code>super("Invalid Temperature")</code>.</li>
  <li>In a validation method: <code>if (temp &lt; -90 || temp &gt; 60) throw new TemperatureException();</code></li>
  <li>In main, catch <code>TemperatureException</code> and print <code>e.getMessage()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

class TemperatureException extends Exception {
    public TemperatureException() {
        super("Invalid Temperature");
    }
}

public class Main {
    static void validateTemperature(int temperature) throws TemperatureException {
        if (temperature < -90 || temperature > 60)
            throw new TemperatureException();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int temperature = sc.nextInt();
        try {
            validateTemperature(temperature);
            System.out.println("Temperature Accepted");
        } catch (TemperatureException e) {
            System.out.println(e.getMessage());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create TemperatureException extending Exception

public class Main {
    // TODO: Create validateTemperature method with throws
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int temperature = sc.nextInt();
        // TODO: Call validateTemperature in try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: '25',  expected: 'Temperature Accepted', description: 'Valid: 25°C' },
      { input: '75',  expected: 'Invalid Temperature',  description: 'Too hot: 75°C' },
      { input: '-95', expected: 'Invalid Temperature',  description: 'Too cold: -95°C' },
      { input: '60',  expected: 'Temperature Accepted', description: 'Boundary: exactly 60°C' },
      { input: '-90', expected: 'Temperature Accepted', description: 'Boundary: exactly -90°C' },
    ]
  },

  {
    id: 'e8', title: 'Validate a Number Range Using Custom Exception',
    difficulty: 'Medium', source: 'PDF 3 — Q8',
    tags: ['custom exception', 'ScoreException'],
    description: `<p>A contest registration system accepts a participant's score. The score must be between <strong>0</strong> and <strong>500</strong>.</p>
<p>Create a custom exception named <code>ScoreException</code>.</p>
<ul>
  <li>If the score is invalid, throw the exception with message: <code>Score Out of Range</code></li>
  <li>Otherwise print the score itself.</li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">250</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">250</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">600</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Score Out of Range</span></div></div>`,
    hint: `<ul>
  <li>Create <code>class ScoreException extends Exception</code> with <code>super("Score Out of Range")</code> in the constructor.</li>
  <li>Create <code>static void validateScore(int score) throws ScoreException</code>.</li>
  <li>Throw <code>new ScoreException()</code> when score &lt; 0 or score &gt; 500.</li>
  <li>In main, catch the exception and print <code>e.getMessage()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

class ScoreException extends Exception {
    public ScoreException() { super("Score Out of Range"); }
}

public class Main {
    static void validateScore(int score) throws ScoreException {
        if (score < 0 || score > 500) throw new ScoreException();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();
        try {
            validateScore(score);
            System.out.println(score);
        } catch (ScoreException e) {
            System.out.println(e.getMessage());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create ScoreException extending Exception

public class Main {
    // TODO: Create validateScore with throws ScoreException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();
        // TODO: Try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: '250', expected: '250',              description: 'Valid score' },
      { input: '600', expected: 'Score Out of Range', description: 'Too high' },
      { input: '-1',  expected: 'Score Out of Range', description: 'Negative' },
      { input: '0',   expected: '0',                description: 'Boundary: 0' },
      { input: '500', expected: '500',              description: 'Boundary: 500' },
    ]
  },

  {
    id: 'e9', title: 'Custom Exception with Error Codes',
    difficulty: 'Medium', source: 'PDF 3 — Q9',
    tags: ['custom exception', 'error code', 'PackageWeightException'],
    description: `<p>A parcel service checks the declared weight of a package. Use these rules:</p>
<ul>
  <li>Weight &lt; 1 kg → error code <code>101</code></li>
  <li>Weight &gt; 25 kg → error code <code>202</code></li>
  <li>Otherwise → print <code>Accepted</code></li>
</ul>
<p>Create a custom exception <code>PackageWeightException</code> containing an integer error code. Print the error code when an exception occurs.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">10</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Accepted</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">30</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">202</span></div></div>`,
    hint: `<ul>
  <li>Create exception class with <code>private int code;</code>, a constructor that stores the code, and a <code>getCode()</code> method.</li>
  <li>In the validation method, throw <code>new PackageWeightException(101)</code> or <code>new PackageWeightException(202)</code>.</li>
  <li>In main, catch the exception and print <code>e.getCode()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

class PackageWeightException extends Exception {
    private int code;
    public PackageWeightException(int code) { this.code = code; }
    public int getCode() { return code; }
}

public class Main {
    static void validateWeight(int weight) throws PackageWeightException {
        if (weight < 1) throw new PackageWeightException(101);
        if (weight > 25) throw new PackageWeightException(202);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int weight = sc.nextInt();
        try {
            validateWeight(weight);
            System.out.println("Accepted");
        } catch (PackageWeightException e) {
            System.out.println(e.getCode());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create PackageWeightException with int code field and getCode()

public class Main {
    // TODO: validateWeight throws PackageWeightException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int weight = sc.nextInt();
        // TODO: try-catch, print code or "Accepted"
        sc.close();
    }
}`,
    testCases: [
      { input: '10', expected: 'Accepted', description: 'Valid weight' },
      { input: '30', expected: '202',      description: 'Too heavy → code 202' },
      { input: '0',  expected: '101',      description: 'Too light → code 101' },
      { input: '1',  expected: 'Accepted', description: 'Boundary: minimum 1kg' },
      { input: '25', expected: 'Accepted', description: 'Boundary: maximum 25kg' },
    ]
  },

  {
    id: 'e10', title: 'Password Validation with Custom Exception',
    difficulty: 'Medium', source: 'PDF 3 — Q10',
    tags: ['custom exception', 'string validation', 'PasswordRuleException'],
    description: `<p>A website requires every password to satisfy these conditions:</p>
<ol>
  <li>At least <strong>7</strong> characters.</li>
  <li>At least one <strong>digit</strong>.</li>
  <li>At least one <strong>uppercase</strong> letter.</li>
</ol>
<p>Create a custom exception named <code>PasswordRuleException</code>.</p>
<ul>
  <li>If the password violates any rule, throw the exception and print: <code>Invalid Password</code></li>
  <li>Otherwise print: <code>Password Accepted</code></li>
</ul>`,
    hint: `<ul>
  <li>Traverse the password character by character using <code>password.charAt(i)</code>.</li>
  <li>Track <code>hasDigit</code> and <code>hasUpper</code> booleans.</li>
  <li>Check: <code>password.length() &lt; 7 || !hasDigit || !hasUpper</code> → throw exception.</li>
  <li>Use <code>Character.isDigit(ch)</code> and <code>Character.isUpperCase(ch)</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

class PasswordRuleException extends Exception {
    public PasswordRuleException() { super("Invalid Password"); }
}

public class Main {
    static void validatePassword(String password) throws PasswordRuleException {
        boolean hasDigit = false, hasUpper = false;
        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isDigit(ch)) hasDigit = true;
            if (Character.isUpperCase(ch)) hasUpper = true;
        }
        if (password.length() < 7 || !hasDigit || !hasUpper)
            throw new PasswordRuleException();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password = sc.nextLine();
        try {
            validatePassword(password);
            System.out.println("Password Accepted");
        } catch (PasswordRuleException e) {
            System.out.println(e.getMessage());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create PasswordRuleException

public class Main {
    // TODO: validatePassword throws PasswordRuleException
    // Check: length >= 7, has digit, has uppercase
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password = sc.nextLine();
        // TODO: try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: 'Hello1A',  expected: 'Password Accepted', description: 'Valid: 7 chars, digit, uppercase' },
      { input: 'hello1a',  expected: 'Invalid Password',  description: 'No uppercase' },
      { input: 'HelloABC', expected: 'Invalid Password',  description: 'No digit' },
      { input: 'H1a',      expected: 'Invalid Password',  description: 'Too short' },
      { input: 'Hello123', expected: 'Password Accepted', description: 'Valid: 8 chars' },
    ]
  },

  {
    id: 'e11', title: 'Validate a University User ID',
    difficulty: 'Medium', source: 'PDF 3 — Q11',
    tags: ['custom exception', 'string validation', 'InvalidUserIdException'],
    description: `<p>A university creates user IDs using this format:</p>
<ul>
  <li>Exactly <strong>6</strong> characters.</li>
  <li>First character must be a <strong>letter</strong>.</li>
  <li>Remaining 5 characters must all be <strong>digits</strong>.</li>
</ul>
<p>Example: <code>A12345</code> is valid.</p>
<p>Create <code>InvalidUserIdException</code>. Print <code>Valid ID</code> or <code>Invalid ID</code>.</p>`,
    hint: `<ul>
  <li>Check: <code>id.length() != 6</code> → throw exception.</li>
  <li>Check: <code>!Character.isLetter(id.charAt(0))</code> → throw exception.</li>
  <li>Loop from index 1 to end: <code>!Character.isDigit(id.charAt(i))</code> → throw exception.</li>
</ul>`,
    solution: `import java.util.Scanner;

class InvalidUserIdException extends Exception {
    public InvalidUserIdException() { super("Invalid ID"); }
}

public class Main {
    static void validateUserId(String id) throws InvalidUserIdException {
        if (id.length() != 6) throw new InvalidUserIdException();
        if (!Character.isLetter(id.charAt(0))) throw new InvalidUserIdException();
        for (int i = 1; i < id.length(); i++)
            if (!Character.isDigit(id.charAt(i))) throw new InvalidUserIdException();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String id = sc.nextLine();
        try {
            validateUserId(id);
            System.out.println("Valid ID");
        } catch (InvalidUserIdException e) {
            System.out.println(e.getMessage());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create InvalidUserIdException

public class Main {
    // TODO: validateUserId(String id) throws InvalidUserIdException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String id = sc.nextLine();
        // TODO: try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: 'A12345', expected: 'Valid ID',   description: 'Valid: letter + 5 digits' },
      { input: '123456', expected: 'Invalid ID', description: 'First char not a letter' },
      { input: 'AB2345', expected: 'Invalid ID', description: 'Second char not a digit' },
      { input: 'A123',   expected: 'Invalid ID', description: 'Too short' },
      { input: 'Z99999', expected: 'Valid ID',   description: 'Valid uppercase + 5 digits' },
    ]
  },

  {
    id: 'e12', title: 'Custom Exception in Power Calculation',
    difficulty: 'Medium', source: 'PDF 3 — Q12',
    tags: ['custom exception', 'PowerException', 'math'],
    description: `<p>Create a method:</p>
<div class="example-block"><div class="ex-val"><code>static int calculatePower(int base, int exponent)</code></div></div>
<p>Calculate <code>base</code> raised to <code>exponent</code>. The following inputs are invalid:</p>
<ul>
  <li>Negative base</li>
  <li>Negative exponent</li>
</ul>
<p>For either invalid condition, throw a custom <code>PowerException</code> with message: <code>Negative Input</code></p>
<p>Otherwise return the calculated power.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">3 4</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">81</span></div></div>`,
    hint: `<ul>
  <li>Create <code>class PowerException extends Exception</code> with <code>super("Negative Input")</code>.</li>
  <li>In <code>calculatePower</code>: <code>if (base &lt; 0 || exponent &lt; 0) throw new PowerException();</code></li>
  <li>Calculate power with a loop: start result = 1, multiply result by base, exponent times.</li>
</ul>`,
    solution: `import java.util.Scanner;

class PowerException extends Exception {
    public PowerException() { super("Negative Input"); }
}

public class Main {
    static int calculatePower(int base, int exponent) throws PowerException {
        if (base < 0 || exponent < 0) throw new PowerException();
        int result = 1;
        for (int i = 1; i <= exponent; i++) result *= base;
        return result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int base = sc.nextInt();
        int exponent = sc.nextInt();
        try {
            System.out.println(calculatePower(base, exponent));
        } catch (PowerException e) {
            System.out.println(e.getMessage());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create PowerException

public class Main {
    // TODO: calculatePower throws PowerException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int base = sc.nextInt();
        int exponent = sc.nextInt();
        // TODO: try-catch
        sc.close();
    }
}`,
    testCases: [
      { input: '3 4',  expected: '81',            description: '3^4 = 81' },
      { input: '-3 4', expected: 'Negative Input', description: 'Negative base' },
      { input: '3 -4', expected: 'Negative Input', description: 'Negative exponent' },
      { input: '2 10', expected: '1024',           description: '2^10 = 1024' },
      { input: '5 0',  expected: '1',              description: 'Any number^0 = 1' },
    ]
  },

  {
    id: 'e13', title: 'Process Multiple Login Requests',
    difficulty: 'Hard', source: 'PDF 3 — Q13',
    tags: ['custom exception', 'CredentialException', 'error code', 'multiple test cases'],
    description: `<p>A system receives several account passwords. For every password:</p>
<ul>
  <li>Must contain at least <strong>6</strong> characters.</li>
  <li>Must contain at least one <strong>digit</strong>.</li>
</ul>
<p>Create <code>CredentialException</code> with an integer status code:</p>
<ul>
  <li><code>-5</code> → password too short</li>
  <li><code>3</code> → password has no digit</li>
</ul>
<p>If valid, print <code>1</code>. Otherwise print the exception code. Process multiple passwords.</p>
<div class="example-block"><div class="ex-label">Input Format</div>
<div class="ex-val">First line: t (number of passwords)<br>Next t lines: one password each</div></div>`,
    hint: `<ul>
  <li>Create <code>CredentialException</code> with a <code>private int code</code> field and <code>getCode()</code>.</li>
  <li>First check length &lt; 6 → throw with code -5.</li>
  <li>Then check if no digit exists → throw with code 3.</li>
  <li>Use a loop: read t, then process each password in a try-catch.</li>
</ul>`,
    solution: `import java.util.Scanner;

class CredentialException extends Exception {
    private int code;
    public CredentialException(int code) { this.code = code; }
    public int getCode() { return code; }
}

public class Main {
    static void validatePassword(String password) throws CredentialException {
        if (password.length() < 6) throw new CredentialException(-5);
        boolean hasDigit = false;
        for (int i = 0; i < password.length(); i++)
            if (Character.isDigit(password.charAt(i))) { hasDigit = true; break; }
        if (!hasDigit) throw new CredentialException(3);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt(); sc.nextLine();
        while (t-- > 0) {
            String password = sc.nextLine();
            try {
                validatePassword(password);
                System.out.println(1);
            } catch (CredentialException e) {
                System.out.println(e.getCode());
            }
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create CredentialException with int code

public class Main {
    // TODO: validatePassword throws CredentialException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt(); sc.nextLine();
        while (t-- > 0) {
            String password = sc.nextLine();
            // TODO: try-catch each password
        }
        sc.close();
    }
}`,
    testCases: [
      { input: '3\nabc1de\nab123\nabc', expected: '1\n-5\n-5', description: 'Valid, too short, too short' },
      { input: '2\nabcdefgh\nabcdef1', expected: '3\n1',       description: 'No digit, then valid' },
      { input: '1\nPass12',           expected: '1',            description: 'Valid 6 chars with digit' },
      { input: '2\nP1\nPassword1',    expected: '-5\n1',       description: 'Too short, then valid' },
      { input: '1\npassword',         expected: '3',            description: 'Long but no digit' },
    ]
  },

  {
    id: 'e14', title: 'Array Processing with ArithmeticException',
    difficulty: 'Hard', source: 'PDF 3 — Q14',
    tags: ['ArithmeticException', 'array', 'algorithm'],
    description: `<p>Given an integer array, calculate the sum of all its elements.</p>
<p>For every element <code>x</code>, calculate: <code>remaining = total - x</code></p>
<p>Count all elements where <code>remaining % x == 0</code>.</p>
<p>If an element is zero, the modulo operation causes an <code>ArithmeticException</code>. Do not prevent it manually — allow it to occur and handle it using <code>catch</code>. Print the exception object itself.</p>
<div class="example-block"><div class="ex-label">Input Format</div>
<div class="ex-val">n, then n integers</div></div>
<div class="example-block"><div class="ex-label">Example (no zero)</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">4<br>2 3 4 6</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">2</span></div></div>`,
    hint: `<ul>
  <li>Calculate total sum first.</li>
  <li>Inside the try block, loop through each element: compute <code>remaining = total - value</code>, then check <code>remaining % value == 0</code>.</li>
  <li>If value is zero, Java throws <code>ArithmeticException</code> — catch it and print <code>e</code> (which prints the full exception object).</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static void processArray(int[] arr) {
        int total = 0;
        for (int value : arr) total += value;
        int count = 0;
        try {
            for (int value : arr) {
                int remaining = total - value;
                if (remaining % value == 0) count++;
            }
            System.out.println(count);
        } catch (ArithmeticException e) {
            System.out.println(e);
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        processArray(arr);
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static void processArray(int[] arr) {
        // TODO: Calculate total sum
        // TODO: Try-catch: loop and count elements where (total-x) % x == 0
        // Catch ArithmeticException and print e
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        processArray(arr);
        sc.close();
    }
}`,
    testCases: [
      { input: '4\n2 3 4 6',         expected: '2',                                          description: 'Count elements satisfying condition' },
      { input: '3\n1 1 1',           expected: '3',                                          description: 'All match: (3-1)%1 = 0' },
      { input: '3\n2 4 8',           expected: '1',                                          description: 'Only element 2: (14-2)%2=0' },
      { input: '4\n1 2 3 0',         expected: 'java.lang.ArithmeticException: / by zero',  description: 'Zero element triggers exception' },
      { input: '3\n3 3 3',           expected: '3',                                          description: '(9-3)%3 = 0 for all' },
    ]
  },

  {
    id: 'e15', title: 'Complete Custom Validation System',
    difficulty: 'Hard', source: 'PDF 3 — Q15',
    tags: ['custom exception', 'ApplicationException', 'error codes', 'multiple test cases'],
    description: `<p>A university scholarship portal validates each applicant. An application is accepted only when:</p>
<ol>
  <li>Student ID is exactly <strong>7</strong> characters.</li>
  <li>First character is an <strong>uppercase letter</strong>.</li>
  <li>Remaining 6 characters are <strong>digits</strong>.</li>
  <li>Score is between <strong>40</strong> and <strong>100</strong>.</li>
</ol>
<p>Create <code>ApplicationException</code> with an error code:</p>
<ul>
  <li><code>101</code> → invalid student ID</li>
  <li><code>202</code> → invalid score</li>
</ul>
<p>For valid: print <code>Accepted</code>. For invalid: print the error code. Process multiple applicants.</p>`,
    hint: `<ul>
  <li>Create <code>ApplicationException</code> with int code field and <code>getCode()</code>.</li>
  <li>In validation method: check ID length, first char uppercase, remaining digits → throw code 101.</li>
  <li>Check score 40-100 → throw code 202.</li>
  <li>Read t, then for each: read ID on one line, score on next.</li>
</ul>`,
    solution: `import java.util.Scanner;

class ApplicationException extends Exception {
    private int code;
    public ApplicationException(int code) { this.code = code; }
    public int getCode() { return code; }
}

public class Main {
    static void validateApplication(String studentId, int score) throws ApplicationException {
        if (studentId.length() != 7) throw new ApplicationException(101);
        if (!Character.isUpperCase(studentId.charAt(0))) throw new ApplicationException(101);
        for (int i = 1; i < studentId.length(); i++)
            if (!Character.isDigit(studentId.charAt(i))) throw new ApplicationException(101);
        if (score < 40 || score > 100) throw new ApplicationException(202);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt(); sc.nextLine();
        while (t-- > 0) {
            String studentId = sc.nextLine();
            int score = sc.nextInt(); sc.nextLine();
            try {
                validateApplication(studentId, score);
                System.out.println("Accepted");
            } catch (ApplicationException e) {
                System.out.println(e.getCode());
            }
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.Scanner;

// TODO: Create ApplicationException with error code

public class Main {
    // TODO: validateApplication(String studentId, int score) throws ApplicationException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt(); sc.nextLine();
        while (t-- > 0) {
            String studentId = sc.nextLine();
            int score = sc.nextInt(); sc.nextLine();
            // TODO: try-catch
        }
        sc.close();
    }
}`,
    testCases: [
      { input: '2\nA123456\n75\nB999999\n35',  expected: 'Accepted\n202', description: 'Valid then bad score' },
      { input: '1\nABC1234\n80',               expected: '101',           description: 'Invalid ID format' },
      { input: '1\nA123456\n100',              expected: 'Accepted',      description: 'Boundary score 100' },
      { input: '1\na123456\n75',               expected: '101',           description: 'Lowercase first char' },
      { input: '1\nA123456\n40',               expected: 'Accepted',      description: 'Boundary score 40' },
    ]
  },

  // ═══════════════════════════════════════════
  // PDF 4 — Practice Programs: Exception Handling
  // ═══════════════════════════════════════════

  {
    id: 'e16', title: 'Handle Division by Zero',
    difficulty: 'Easy', source: 'PDF 4 — Q1',
    tags: ['try-catch', 'ArithmeticException'],
    description: `<p>Read two integers and divide the first by the second. If the second number is zero, handle the <code>ArithmeticException</code> and display an appropriate message.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Result = 4</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Cannot divide by zero</span></div></div>`,
    hint: `<ul>
  <li>Place <code>int result = a / b;</code> inside <code>try</code>.</li>
  <li>Print <code>"Result = " + result</code> on success.</li>
  <li>Catch <code>ArithmeticException</code> and print <code>"Cannot divide by zero"</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        try {
            int result = a / b;
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        // TODO: try-catch division, print "Result = X" or "Cannot divide by zero"
    }
}`,
    testCases: [
      { input: '20 5',  expected: 'Result = 4',           description: 'Valid division' },
      { input: '20 0',  expected: 'Cannot divide by zero', description: 'Division by zero' },
      { input: '100 4', expected: 'Result = 25',          description: '100/4=25' },
      { input: '7 2',   expected: 'Result = 3',           description: '7/2=3 (integer)' },
      { input: '0 5',   expected: 'Result = 0',           description: 'Zero dividend' },
    ]
  },

  {
    id: 'e17', title: 'Handle Invalid Array Index',
    difficulty: 'Easy', source: 'PDF 4 — Q2',
    tags: ['ArrayIndexOutOfBoundsException'],
    description: `<p>Given an array of integers and an index, print the element at that index. If the index is invalid, handle the exception and print: <code>Invalid Index</code></p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 20 30 40 50<br>2</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Element = 30</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 20 30 40 50<br>7</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Index</span></div></div>`,
    hint: `<ul>
  <li>Access <code>arr[index]</code> inside a <code>try</code> block.</li>
  <li>Print <code>"Element = " + arr[index]</code> on success.</li>
  <li>Catch <code>ArrayIndexOutOfBoundsException</code> and print <code>"Invalid Index"</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int index = sc.nextInt();
        try {
            System.out.println("Element = " + arr[index]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid Index");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int index = sc.nextInt();
        // TODO: try-catch to print "Element = X" or "Invalid Index"
    }
}`,
    testCases: [
      { input: '5\n10 20 30 40 50\n2', expected: 'Element = 30', description: 'Valid index 2' },
      { input: '5\n10 20 30 40 50\n7', expected: 'Invalid Index', description: 'Out of bounds' },
      { input: '3\n5 10 15\n0',         expected: 'Element = 5',  description: 'First element' },
      { input: '3\n5 10 15\n2',         expected: 'Element = 15', description: 'Last element' },
      { input: '3\n5 10 15\n3',         expected: 'Invalid Index', description: 'Exactly one over' },
    ]
  },

  {
    id: 'e18', title: 'Handle Invalid Number Conversion',
    difficulty: 'Easy', source: 'PDF 4 — Q3',
    tags: ['NumberFormatException', 'Integer.parseInt'],
    description: `<p>Read a number as a String and convert it into an integer using <code>Integer.parseInt()</code>.</p>
<ul>
  <li>If the String is valid, print: <code>Number = X</code></li>
  <li>If the String cannot be converted, handle the <code>NumberFormatException</code> and print: <code>Invalid Number</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">123</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Number = 123</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">12abc</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Number</span></div></div>`,
    hint: `<ul>
  <li>Use <code>sc.nextLine()</code> to read the full input as a String.</li>
  <li>Call <code>Integer.parseInt(input)</code> inside a <code>try</code> block.</li>
  <li>Catch <code>NumberFormatException</code> — Java throws this when the string isn't a valid integer.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        try {
            int number = Integer.parseInt(input);
            System.out.println("Number = " + number);
        } catch (NumberFormatException e) {
            System.out.println("Invalid Number");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        // TODO: parseInt inside try-catch
    }
}`,
    testCases: [
      { input: '123',   expected: 'Number = 123', description: 'Valid number string' },
      { input: '12abc', expected: 'Invalid Number', description: 'Invalid: contains letters' },
      { input: '-45',   expected: 'Number = -45',  description: 'Negative number' },
      { input: '0',     expected: 'Number = 0',    description: 'Zero' },
      { input: 'abc',   expected: 'Invalid Number', description: 'All letters' },
    ]
  },

  {
    id: 'e19', title: 'Handle NullPointerException',
    difficulty: 'Easy', source: 'PDF 4 — Q4',
    tags: ['NullPointerException', 'null'],
    description: `<p>Create a String variable set to <code>null</code>. Attempt to find its length.</p>
<p>If the String is null, handle the <code>NullPointerException</code> and print: <code>String is null</code></p>
<div class="example-block"><div class="ex-label">Expected Output</div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">String is null</span></div></div>
<p>No input needed — the null String is hardcoded in the program.</p>`,
    hint: `<ul>
  <li>Declare: <code>String text = null;</code></li>
  <li>Call <code>text.length()</code> inside a <code>try</code> block.</li>
  <li>Calling any method on a null reference throws <code>NullPointerException</code>.</li>
  <li>Catch it and print <code>"String is null"</code>.</li>
</ul>`,
    solution: `public class Main {
    public static void main(String[] args) {
        String text = null;
        try {
            System.out.println("Length = " + text.length());
        } catch (NullPointerException e) {
            System.out.println("String is null");
        }
    }
}`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        String text = null;
        // TODO: Try to call text.length() and catch NullPointerException
    }
}`,
    testCases: [
      { input: '', expected: 'String is null', description: 'Null reference causes NPE' },
      { input: '', expected: 'String is null', description: 'Hardcoded null — same output' },
      { input: '', expected: 'String is null', description: 'Verify exception is caught' },
      { input: '', expected: 'String is null', description: 'No input needed' },
      { input: '', expected: 'String is null', description: 'NPE always occurs' },
    ]
  },

  {
    id: 'e20', title: 'Multiple catch Blocks',
    difficulty: 'Easy', source: 'PDF 4 — Q5',
    tags: ['multiple catch', 'ArithmeticException', 'ArrayIndexOutOfBoundsException'],
    description: `<p>Write a program that can handle both division by zero and an invalid array index using multiple <code>catch</code> blocks.</p>
<p>Read one integer <code>choice</code>:</p>
<ul>
  <li>If <code>choice == 1</code>: attempt to divide 10 by 0.</li>
  <li>Otherwise: attempt to access index 5 of array <code>{10, 20, 30}</code>.</li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">1</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Cannot divide by zero</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">2</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Array Index</span></div></div>`,
    hint: `<ul>
  <li>Use one <code>try</code> block with two <code>catch</code> blocks.</li>
  <li>First catch: <code>ArithmeticException</code>, second catch: <code>ArrayIndexOutOfBoundsException</code>.</li>
  <li>Each catch has its own specific message to print.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 20, 30};
        int choice = sc.nextInt();
        try {
            if (choice == 1) { int result = 10 / 0; System.out.println(result); }
            else              { System.out.println(arr[5]); }
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid Array Index");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = {10, 20, 30};
        int choice = sc.nextInt();
        // TODO: try with 2 catch blocks for ArithmeticException and ArrayIndexOutOfBoundsException
    }
}`,
    testCases: [
      { input: '1',  expected: 'Cannot divide by zero', description: 'Choice 1 → division by zero' },
      { input: '2',  expected: 'Invalid Array Index',   description: 'Choice 2 → invalid index 5' },
      { input: '10', expected: 'Invalid Array Index',   description: 'Any non-1 → index exception' },
      { input: '0',  expected: 'Invalid Array Index',   description: 'Choice 0 → not 1 → index' },
      { input: '-1', expected: 'Invalid Array Index',   description: 'Negative choice → index' },
    ]
  },

  {
    id: 'e21', title: 'Use finally Block',
    difficulty: 'Easy', source: 'PDF 4 — Q6',
    tags: ['finally', 'try-catch-finally'],
    description: `<p>Read two integers and divide them. Use <code>try-catch-finally</code>.</p>
<p>The <code>finally</code> block must display: <code>Program completed</code> regardless of whether an exception occurs.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 4</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Result = 5<br>Program completed</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Cannot divide by zero<br>Program completed</span></div></div>`,
    hint: `<ul>
  <li>Inside try: compute <code>result = a / b</code>, print <code>"Result = " + result</code>.</li>
  <li>Catch: print <code>"Cannot divide by zero"</code>.</li>
  <li>Finally: always print <code>"Program completed"</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        try {
            int result = a / b;
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } finally {
            System.out.println("Program completed");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        // TODO: try-catch-finally
        // finally prints "Program completed"
    }
}`,
    testCases: [
      { input: '20 4', expected: 'Result = 5\nProgram completed',           description: 'Valid division + finally' },
      { input: '20 0', expected: 'Cannot divide by zero\nProgram completed', description: 'Zero divisor + finally' },
      { input: '9 3',  expected: 'Result = 3\nProgram completed',            description: '9/3=3' },
      { input: '1 1',  expected: 'Result = 1\nProgram completed',            description: '1/1=1' },
      { input: '7 0',  expected: 'Cannot divide by zero\nProgram completed', description: 'Another zero case' },
    ]
  },

  {
    id: 'e22', title: 'Validate Age Using throw',
    difficulty: 'Easy', source: 'PDF 4 — Q7',
    tags: ['throw', 'IllegalArgumentException'],
    description: `<p>Read a person's age. If the age is less than <strong>18</strong>, explicitly throw an <code>IllegalArgumentException</code>.</p>
<ul>
  <li>If age &ge; 18, print: <code>Eligible</code></li>
  <li>If age &lt; 18, print: <code>Not Eligible</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">21</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Eligible</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">15</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Not Eligible</span></div></div>`,
    hint: `<ul>
  <li>Java doesn't auto-generate this exception — you must use <code>throw</code>.</li>
  <li>Inside try: <code>if (age &lt; 18) throw new IllegalArgumentException();</code></li>
  <li>Catch <code>IllegalArgumentException</code> and print <code>"Not Eligible"</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age = sc.nextInt();
        try {
            if (age < 18) throw new IllegalArgumentException();
            System.out.println("Eligible");
        } catch (IllegalArgumentException e) {
            System.out.println("Not Eligible");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age = sc.nextInt();
        // TODO: throw IllegalArgumentException if age < 18
    }
}`,
    testCases: [
      { input: '21', expected: 'Eligible',     description: 'Age 21 is eligible' },
      { input: '15', expected: 'Not Eligible', description: 'Age 15 is not eligible' },
      { input: '18', expected: 'Eligible',     description: 'Boundary: exactly 18' },
      { input: '17', expected: 'Not Eligible', description: 'One under boundary' },
      { input: '0',  expected: 'Not Eligible', description: 'Zero age' },
    ]
  },

  {
    id: 'e23', title: 'throw with a Custom Message',
    difficulty: 'Easy', source: 'PDF 4 — Q8',
    tags: ['throw', 'IllegalArgumentException', 'getMessage'],
    description: `<p>Read a person's marks. If marks are less than <strong>0</strong> or greater than <strong>100</strong>, throw an <code>IllegalArgumentException</code> with the message: <code>Invalid Marks</code></p>
<p>Otherwise display: <code>Marks = X</code></p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">85</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Marks = 85</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">120</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Marks</span></div></div>`,
    hint: `<ul>
  <li>Use <code>throw new IllegalArgumentException("Invalid Marks");</code></li>
  <li>In the catch block, call <code>e.getMessage()</code> to get and print the message.</li>
  <li>This shows how to pass a custom message when throwing built-in exceptions.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        try {
            if (marks < 0 || marks > 100)
                throw new IllegalArgumentException("Invalid Marks");
            System.out.println("Marks = " + marks);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        // TODO: throw IllegalArgumentException("Invalid Marks") if out of 0-100 range
    }
}`,
    testCases: [
      { input: '85',  expected: 'Marks = 85',    description: 'Valid marks' },
      { input: '120', expected: 'Invalid Marks', description: 'Too high' },
      { input: '-5',  expected: 'Invalid Marks', description: 'Negative marks' },
      { input: '0',   expected: 'Marks = 0',     description: 'Boundary 0' },
      { input: '100', expected: 'Marks = 100',   description: 'Boundary 100' },
    ]
  },

  {
    id: 'e24', title: 'Method Using throws',
    difficulty: 'Easy', source: 'PDF 4 — Q9',
    tags: ['throws', 'ArithmeticException', 'method'],
    description: `<p>Create a method <code>divide()</code> that performs division. Declare it with <code>throws ArithmeticException</code>. Handle the exception in <code>main()</code>.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 4</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Result = 5</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">20 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Cannot divide by zero</span></div></div>`,
    hint: `<ul>
  <li>Method signature: <code>static int divide(int a, int b) throws ArithmeticException</code></li>
  <li>Inside the method, just do: <code>return a / b;</code> — Java auto-throws on zero divisor.</li>
  <li>In main, call <code>divide(a, b)</code> inside <code>try-catch</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static int divide(int a, int b) throws ArithmeticException {
        return a / b;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        try {
            int result = divide(a, b);
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    // TODO: static int divide(int a, int b) throws ArithmeticException
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        // TODO: call divide() inside try-catch
    }
}`,
    testCases: [
      { input: '20 4', expected: 'Result = 5',           description: 'Valid: 20/4=5' },
      { input: '20 0', expected: 'Cannot divide by zero', description: 'Zero divisor' },
      { input: '50 5', expected: 'Result = 10',          description: '50/5=10' },
      { input: '7 2',  expected: 'Result = 3',           description: '7/2=3 integer' },
      { input: '0 5',  expected: 'Result = 0',           description: 'Zero dividend' },
    ]
  },

  {
    id: 'e25', title: 'Exception Propagation',
    difficulty: 'Medium', source: 'PDF 4 — Q10',
    tags: ['propagation', 'call stack', 'ArithmeticException'],
    description: `<p>Create three methods: <code>method1()</code>, <code>method2()</code>, <code>method3()</code>.</p>
<p>Generate an exception inside <code>method3()</code> (divide 10 by 0). Allow it to propagate up through <code>method2()</code> → <code>method1()</code> → <code>main()</code> and handle it there.</p>
<div class="example-block"><div class="ex-label">Expected Output</div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Exception handled in main</span></div></div>
<div class="example-block"><div class="ex-label">Flow</div>
<div class="ex-val">main() → method1() → method2() → method3() → Exception → propagates back → caught in main()</div></div>`,
    hint: `<ul>
  <li><code>method3()</code>: do <code>int result = 10 / 0;</code> — no try-catch here.</li>
  <li><code>method2()</code>: just call <code>method3()</code>.</li>
  <li><code>method1()</code>: just call <code>method2()</code>.</li>
  <li>In <code>main()</code>: call <code>method1()</code> inside <code>try-catch</code>.</li>
  <li>The exception "propagates" — bubbles up through the call stack until caught.</li>
</ul>`,
    solution: `public class Main {
    static void method3() { int result = 10 / 0; System.out.println(result); }
    static void method2() { method3(); }
    static void method1() { method2(); }
    public static void main(String[] args) {
        try {
            method1();
        } catch (ArithmeticException e) {
            System.out.println("Exception handled in main");
        }
    }
}`,
    starterCode: `public class Main {
    static void method3() {
        // TODO: Generate exception here (10 / 0), no try-catch
    }
    static void method2() { method3(); }
    static void method1() { method2(); }
    public static void main(String[] args) {
        // TODO: Call method1() inside try-catch here
    }
}`,
    testCases: [
      { input: '', expected: 'Exception handled in main', description: 'Exception propagates to main' },
      { input: '', expected: 'Exception handled in main', description: 'Verify propagation chain' },
      { input: '', expected: 'Exception handled in main', description: 'No input needed' },
      { input: '', expected: 'Exception handled in main', description: 'Exception always caught in main' },
      { input: '', expected: 'Exception handled in main', description: 'Fixed output' },
    ]
  },

  {
    id: 'e26', title: 'Validate a Number Using throw',
    difficulty: 'Easy', source: 'PDF 4 — Q11',
    tags: ['throw', 'IllegalArgumentException', 'method'],
    description: `<p>Read a number. If the number is negative, throw an <code>IllegalArgumentException</code> with message <code>"Number cannot be negative"</code>. Otherwise calculate its square.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Square = 25</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">-5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Number cannot be negative</span></div></div>`,
    hint: `<ul>
  <li>Create a <code>square(int number)</code> method.</li>
  <li>If <code>number &lt; 0</code>: <code>throw new IllegalArgumentException("Number cannot be negative");</code></li>
  <li>Otherwise return <code>number * number</code>.</li>
  <li>In main, catch the exception and print <code>e.getMessage()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static int square(int number) {
        if (number < 0)
            throw new IllegalArgumentException("Number cannot be negative");
        return number * number;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int number = sc.nextInt();
        try {
            System.out.println("Square = " + square(number));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static int square(int number) {
        // TODO: throw if negative, otherwise return square
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int number = sc.nextInt();
        // TODO: print "Square = X" or catch and print message
    }
}`,
    testCases: [
      { input: '5',  expected: 'Square = 25',              description: 'Positive number' },
      { input: '-5', expected: 'Number cannot be negative', description: 'Negative throws' },
      { input: '0',  expected: 'Square = 0',               description: 'Zero is valid' },
      { input: '10', expected: 'Square = 100',             description: '10^2 = 100' },
      { input: '-1', expected: 'Number cannot be negative', description: '-1 is negative' },
    ]
  },

  {
    id: 'e27', title: 'Password Validation (Length)',
    difficulty: 'Easy', source: 'PDF 4 — Q12',
    tags: ['throw', 'IllegalArgumentException', 'string length'],
    description: `<p>Validate a password — it is valid if its length is at least <strong>8</strong>.</p>
<p>If the password is too short, throw an <code>IllegalArgumentException</code>.</p>
<ul>
  <li>Valid: print <code>Valid Password</code></li>
  <li>Invalid: print <code>Invalid Password</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">java@1234</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Valid Password</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">java123</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Password</span></div></div>`,
    hint: `<ul>
  <li>Create <code>validatePassword(String password)</code> method.</li>
  <li>If <code>password.length() &lt; 8</code>: <code>throw new IllegalArgumentException();</code></li>
  <li>Otherwise print <code>"Valid Password"</code>.</li>
  <li>Catch in main and print <code>"Invalid Password"</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static void validatePassword(String password) {
        if (password.length() < 8) throw new IllegalArgumentException();
        System.out.println("Valid Password");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password = sc.nextLine();
        try {
            validatePassword(password);
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid Password");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static void validatePassword(String password) {
        // TODO: throw if length < 8, print "Valid Password" otherwise
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String password = sc.nextLine();
        // TODO: try-catch
    }
}`,
    testCases: [
      { input: 'java@1234', expected: 'Valid Password',   description: '9 chars: valid' },
      { input: 'java123',   expected: 'Invalid Password', description: '7 chars: invalid' },
      { input: 'abcdefgh',  expected: 'Valid Password',   description: 'Exactly 8: valid' },
      { input: 'abc',       expected: 'Invalid Password', description: 'Too short' },
      { input: 'longpassword123', expected: 'Valid Password', description: 'Long password' },
    ]
  },

  {
    id: 'e28', title: 'Multiple catch with User Input',
    difficulty: 'Medium', source: 'PDF 4 — Q13',
    tags: ['multiple catch', 'ArithmeticException', 'ArrayIndexOutOfBoundsException'],
    description: `<p>Read two integers <code>a</code>, <code>b</code>, and an array index. Array is <code>{10, 20, 30}</code>.</p>
<p>Perform:</p>
<ol>
  <li>Division of <code>a / b</code> — print <code>"Division = X"</code></li>
  <li>Access the array at the given index — print <code>"Element = X"</code></li>
</ol>
<p>Handle both possible exceptions with separate catch blocks.</p>
<div class="example-block"><div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">10 2 1</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Division = 5<br>Element = 20</span></div></div>`,
    hint: `<ul>
  <li>Both operations go inside the same <code>try</code> block.</li>
  <li>First catch: <code>ArithmeticException</code> → <code>"Cannot divide by zero"</code>.</li>
  <li>Second catch: <code>ArrayIndexOutOfBoundsException</code> → <code>"Invalid array index"</code>.</li>
  <li>If division by zero occurs, the array access line is never reached.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt(), index = sc.nextInt();
        int[] arr = {10, 20, 30};
        try {
            int result = a / b;
            System.out.println("Division = " + result);
            System.out.println("Element = " + arr[index]);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt(), index = sc.nextInt();
        int[] arr = {10, 20, 30};
        // TODO: try with 2 catch blocks
    }
}`,
    testCases: [
      { input: '10 2 1', expected: 'Division = 5\nElement = 20', description: 'Both valid' },
      { input: '10 0 1', expected: 'Cannot divide by zero',      description: 'Zero divisor' },
      { input: '10 2 5', expected: 'Division = 5\nInvalid array index', description: 'Valid division, bad index' },
      { input: '9 3 0',  expected: 'Division = 3\nElement = 10', description: 'First element' },
      { input: '6 2 2',  expected: 'Division = 3\nElement = 30', description: 'Last element' },
    ]
  },

  {
    id: 'e29', title: 'Exception Information',
    difficulty: 'Easy', source: 'PDF 4 — Q14',
    tags: ['getClass', 'getSimpleName', 'getMessage', 'exception info'],
    description: `<p>Generate an <code>ArithmeticException</code> and display:</p>
<ul>
  <li>Exception class name using <code>e.getClass().getSimpleName()</code></li>
  <li>Exception message using <code>e.getMessage()</code></li>
</ul>
<div class="example-block"><div class="ex-label">Expected Output</div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Exception Type : ArithmeticException<br>Message : / by zero</span></div></div>
<p>No input needed — hardcode <code>10 / 0</code>.</p>`,
    hint: `<ul>
  <li>Hardcode: <code>int result = 10 / 0;</code> inside try.</li>
  <li>In catch: <code>e.getClass().getSimpleName()</code> gives the exception class name.</li>
  <li><code>e.getMessage()</code> gives the default message for this exception: <code>"/ by zero"</code>.</li>
</ul>`,
    solution: `public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Exception Type : " + e.getClass().getSimpleName());
            System.out.println("Message : " + e.getMessage());
        }
    }
}`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        try {
            // TODO: Cause an ArithmeticException (10/0)
        } catch (ArithmeticException e) {
            // TODO: Print exception class name and message
        }
    }
}`,
    testCases: [
      { input: '', expected: 'Exception Type : ArithmeticException\nMessage : / by zero', description: 'Exception info printed' },
      { input: '', expected: 'Exception Type : ArithmeticException\nMessage : / by zero', description: 'Fixed output' },
      { input: '', expected: 'Exception Type : ArithmeticException\nMessage : / by zero', description: 'No input needed' },
      { input: '', expected: 'Exception Type : ArithmeticException\nMessage : / by zero', description: 'Always same output' },
      { input: '', expected: 'Exception Type : ArithmeticException\nMessage : / by zero', description: 'Verify class and message' },
    ]
  },

  {
    id: 'e30', title: 'Safe Division Method',
    difficulty: 'Medium', source: 'PDF 4 — Q15',
    tags: ['throw', 'ArithmeticException', 'method'],
    description: `<p>Create a method <code>divide()</code> that:</p>
<ul>
  <li>Accepts two integers.</li>
  <li>Explicitly <code>throws</code> an <code>ArithmeticException</code> when the divisor is zero.</li>
  <li>Returns the result otherwise.</li>
</ul>
<p>Handle the exception in <code>main()</code>.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">100 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Result = 20</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">100 0</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Division by zero is not allowed</span></div></div>`,
    hint: `<ul>
  <li>Inside <code>divide()</code>: <code>if (b == 0) throw new ArithmeticException("Division by zero is not allowed");</code></li>
  <li>Then return <code>a / b</code>.</li>
  <li>In main, catch and print <code>e.getMessage()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("Division by zero is not allowed");
        return a / b;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        try {
            int result = divide(a, b);
            System.out.println("Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static int divide(int a, int b) {
        // TODO: Explicitly throw ArithmeticException if b == 0
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        // TODO: call divide(), print "Result = X" or exception message
    }
}`,
    testCases: [
      { input: '100 5', expected: 'Result = 20',                   description: '100/5=20' },
      { input: '100 0', expected: 'Division by zero is not allowed', description: 'Zero → explicit throw' },
      { input: '50 2',  expected: 'Result = 25',                   description: '50/2=25' },
      { input: '7 3',   expected: 'Result = 2',                    description: '7/3=2 integer' },
      { input: '0 0',   expected: 'Division by zero is not allowed', description: 'Both zero' },
    ]
  },

  {
    id: 'e31', title: 'Validate Array Index (Explicit)',
    difficulty: 'Medium', source: 'PDF 4 — Q16',
    tags: ['throw', 'IllegalArgumentException', 'array validation'],
    description: `<p>Create a method <code>getElement()</code> that accepts an array and an index. If the index is invalid, explicitly throw an <code>IllegalArgumentException</code>. Otherwise return the element.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 20 30 40 50<br>3</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Element = 40</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 20 30 40 50<br>8</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Index</span></div></div>`,
    hint: `<ul>
  <li>In <code>getElement()</code>: <code>if (index &lt; 0 || index &gt;= arr.length) throw new IllegalArgumentException("Invalid Index");</code></li>
  <li>This is explicit validation vs. letting Java throw <code>ArrayIndexOutOfBoundsException</code>.</li>
  <li>Catch <code>IllegalArgumentException</code> in main and print <code>e.getMessage()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static int getElement(int[] arr, int index) {
        if (index < 0 || index >= arr.length)
            throw new IllegalArgumentException("Invalid Index");
        return arr[index];
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int index = sc.nextInt();
        try {
            int value = getElement(arr, index);
            System.out.println("Element = " + value);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static int getElement(int[] arr, int index) {
        // TODO: throw IllegalArgumentException("Invalid Index") if invalid
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int index = sc.nextInt();
        // TODO: try-catch
    }
}`,
    testCases: [
      { input: '5\n10 20 30 40 50\n3', expected: 'Element = 40', description: 'Valid index 3' },
      { input: '5\n10 20 30 40 50\n8', expected: 'Invalid Index', description: 'Out of bounds' },
      { input: '3\n5 10 15\n0',         expected: 'Element = 5',  description: 'First element' },
      { input: '3\n5 10 15\n-1',        expected: 'Invalid Index', description: 'Negative index' },
      { input: '3\n5 10 15\n2',         expected: 'Element = 15', description: 'Last element' },
    ]
  },

  {
    id: 'e32', title: 'Validate Student Marks',
    difficulty: 'Easy', source: 'PDF 4 — Q17',
    tags: ['throw', 'IllegalArgumentException', 'input validation'],
    description: `<p>Create a method that accepts marks. Valid marks must be between <strong>0</strong> and <strong>100</strong>.</p>
<ul>
  <li>If the marks are invalid, throw an <code>IllegalArgumentException</code>.</li>
  <li>Otherwise display: <code>Valid Marks</code></li>
</ul>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">85</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Valid Marks</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">105</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Marks</span></div></div>`,
    hint: `<ul>
  <li>Create <code>validateMarks(int marks)</code>.</li>
  <li>If <code>marks &lt; 0 || marks &gt; 100</code>: <code>throw new IllegalArgumentException("Invalid Marks");</code></li>
  <li>Otherwise: no throw, the validation passes.</li>
  <li>Catch in main and print <code>e.getMessage()</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static void validateMarks(int marks) {
        if (marks < 0 || marks > 100)
            throw new IllegalArgumentException("Invalid Marks");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        try {
            validateMarks(marks);
            System.out.println("Valid Marks");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static void validateMarks(int marks) {
        // TODO: throw IllegalArgumentException if invalid
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        // TODO: call validateMarks, print "Valid Marks" or catch error
    }
}`,
    testCases: [
      { input: '85',  expected: 'Valid Marks',   description: 'Valid marks' },
      { input: '105', expected: 'Invalid Marks', description: 'Too high' },
      { input: '-5',  expected: 'Invalid Marks', description: 'Negative' },
      { input: '0',   expected: 'Valid Marks',   description: 'Boundary 0' },
      { input: '100', expected: 'Valid Marks',   description: 'Boundary 100' },
    ]
  },

  {
    id: 'e33', title: 'Safe Integer Conversion Method',
    difficulty: 'Medium', source: 'PDF 4 — Q18',
    tags: ['NumberFormatException', 'Integer.parseInt', 'method'],
    description: `<p>Create a method that accepts a String and converts it into an integer using <code>Integer.parseInt()</code>. If the String is not a valid integer, handle the <code>NumberFormatException</code>.</p>
<div class="example-block"><div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">250</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Number = 250</span></div></div>
<div class="example-block"><div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">25A</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Invalid Integer</span></div></div>`,
    hint: `<ul>
  <li>Create <code>static int convert(String value)</code> that returns <code>Integer.parseInt(value)</code>.</li>
  <li>In main: call <code>convert()</code> inside <code>try</code>, print <code>"Number = " + result</code>.</li>
  <li>Catch <code>NumberFormatException</code> and print <code>"Invalid Integer"</code>.</li>
</ul>`,
    solution: `import java.util.Scanner;

public class Main {
    static int convert(String value) {
        return Integer.parseInt(value);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String value = sc.nextLine();
        try {
            int number = convert(value);
            System.out.println("Number = " + number);
        } catch (NumberFormatException e) {
            System.out.println("Invalid Integer");
        }
    }
}`,
    starterCode: `import java.util.Scanner;

public class Main {
    static int convert(String value) {
        // TODO: Integer.parseInt(value)
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String value = sc.nextLine();
        // TODO: call convert(), print "Number = X" or "Invalid Integer"
    }
}`,
    testCases: [
      { input: '250', expected: 'Number = 250',  description: 'Valid integer string' },
      { input: '25A', expected: 'Invalid Integer', description: 'Contains letter' },
      { input: '-99', expected: 'Number = -99',  description: 'Negative integer' },
      { input: 'abc', expected: 'Invalid Integer', description: 'All letters' },
      { input: '0',   expected: 'Number = 0',    description: 'Zero' },
    ]
  },

];
