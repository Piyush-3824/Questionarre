// problems.js - All 15 Java Collections Practice Questions

const PROBLEMS = [
  {
    id: 1,
    title: "Add New Product Codes",
    difficulty: "Easy",
    collection: "ArrayList<Integer>",
    tags: ["ArrayList", "contains", "duplicates"],
    description: `<p>An online store maintains an <code>ArrayList&lt;Integer&gt;</code> containing the product codes currently available.</p>
<p>A second array contains newly received product codes. For every new code:</p>
<ul>
  <li>Add it if it is <strong>not already present</strong>.</li>
  <li>Ignore it if the code already exists.</li>
</ul>
<p>Return the updated <code>ArrayList</code>.</p>

<h3>Method Signature</h3>
<div class="example-block">
<div class="ex-label">Required Method</div>
<div class="ex-val">public static ArrayList&lt;Integer&gt; updateProducts(<br>&nbsp;&nbsp;&nbsp;&nbsp;ArrayList&lt;Integer&gt; products, int[] newProducts)</div>
</div>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Existing:</span><span class="ex-val">3<br>101 202 303</span></div>
<div class="ex-line"><span class="ex-key">New:</span><span class="ex-val">3<br>202 404 101</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">101 202 303 404</span></div>
<div class="ex-explain">202 and 101 already exist, so only 404 is added.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n, m &le; 1000</li>
  <li>Product codes are positive integers</li>
  <li>Input: first line = n (existing count), next n ints, then m (new count), next m ints</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Iterate through each element in the <code>newProducts</code> array.</li>
  <li>For each code, check: <code>if (!products.contains(code))</code></li>
  <li>If not present, call <code>products.add(code)</code>.</li>
  <li><code>contains()</code> does a linear scan through the ArrayList — perfect for small lists.</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> updateProducts(
            ArrayList<Integer> products,
            int[] newProducts) {
        for (int code : newProducts) {
            if (!products.contains(code)) {
                products.add(code);
            }
        }
        return products;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> products = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            products.add(sc.nextInt());
        }
        int m = sc.nextInt();
        int[] newProducts = new int[m];
        for (int i = 0; i < m; i++) {
            newProducts[i] = sc.nextInt();
        }
        ArrayList<Integer> result = updateProducts(products, newProducts);
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> updateProducts(
            ArrayList<Integer> products,
            int[] newProducts) {
        // TODO: Add each new code only if it doesn't already exist
        
        return products;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> products = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            products.add(sc.nextInt());
        }
        int m = sc.nextInt();
        int[] newProducts = new int[m];
        for (int i = 0; i < m; i++) {
            newProducts[i] = sc.nextInt();
        }
        ArrayList<Integer> result = updateProducts(products, newProducts);
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "3\n101 202 303\n3\n202 404 101", expected: "101 202 303 404", description: "New code 404 added; 202 and 101 ignored" },
      { input: "2\n10 20\n3\n30 10 40", expected: "10 20 30 40", description: "30 and 40 added; 10 ignored" },
      { input: "4\n1 2 3 4\n2\n2 3", expected: "1 2 3 4", description: "All new codes already exist" },
      { input: "1\n5\n3\n5 6 7", expected: "5 6 7", description: "Two new distinct codes added" },
      { input: "3\n100 200 300\n4\n400 500 100 600", expected: "100 200 300 400 500 600", description: "Three new codes added, 100 skipped" },
    ]
  },

  {
    id: 2,
    title: "Count a Requested Item",
    difficulty: "Easy",
    collection: "ArrayList<Integer>",
    tags: ["ArrayList", "frequency", "counting"],
    description: `<p>A warehouse stores item numbers in an <code>ArrayList&lt;Integer&gt;</code>.</p>
<p>Given an item number to search for:</p>
<ul>
  <li>Print how many times it occurs.</li>
  <li>If it does not appear at all, print <strong>-1</strong>.</li>
</ul>
<p>Process <strong>multiple test cases</strong> (first line = number of test cases T).</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">2<br>5<br>3 7 3 9 3<br>3<br>4<br>1 2 4 4<br>5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">3<br>2</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; T &le; 100</li>
  <li>1 &le; n &le; 1000</li>
  <li>Input per test: n, then n integers, then the target</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Read T test cases in a loop.</li>
  <li>For each test, maintain a <code>count</code> variable initialized to 0.</li>
  <li>Loop through the ArrayList: if <code>value == target</code>, increment count.</li>
  <li>If count is 0, return -1; otherwise return count.</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static int countItem(ArrayList<Integer> items, int target) {
        int count = 0;
        for (int value : items) {
            if (value == target) {
                count++;
            }
        }
        return count == 0 ? -1 : count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            ArrayList<Integer> items = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                items.add(sc.nextInt());
            }
            int target = sc.nextInt();
            System.out.println(countItem(items, target));
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static int countItem(ArrayList<Integer> items, int target) {
        // TODO: Count occurrences of target.
        // Return -1 if not found.
        
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            ArrayList<Integer> items = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                items.add(sc.nextInt());
            }
            int target = sc.nextInt();
            System.out.println(countItem(items, target));
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "1\n5\n3 7 3 9 3\n3", expected: "3", description: "Item 3 appears 3 times" },
      { input: "1\n4\n1 2 4 4\n5", expected: "-1", description: "Item 5 not found" },
      { input: "2\n5\n3 7 3 9 3\n3\n4\n1 2 4 4\n4", expected: "3\n2", description: "Two test cases" },
      { input: "1\n3\n10 10 10\n10", expected: "3", description: "All elements are target" },
      { input: "1\n4\n5 6 7 8\n9", expected: "-1", description: "Target absent from list" },
    ]
  },

  {
    id: 3,
    title: "Select High-Priority Tasks",
    difficulty: "Easy",
    collection: "ArrayList<Integer>",
    tags: ["ArrayList", "filter", "threshold"],
    description: `<p>A project management system stores task priorities in an <code>ArrayList&lt;Integer&gt;</code>.</p>
<p>A task is considered <strong>high priority</strong> when its priority value is <strong>at least 7</strong>.</p>
<p>Create and return a <strong>new ArrayList</strong> containing only those high-priority values. Maintain their original order. Do <strong>not</strong> modify the original collection.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6<br>3 7 5 9 7 2</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">7 9 7</span></div>
<div class="ex-explain">Values 7, 9, 7 are &ge; 7; others are filtered out.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Priority values: 1 to 10</li>
  <li>Input: n on first line, then n space-separated integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Create a new empty <code>ArrayList&lt;Integer&gt; result</code>.</li>
  <li>Iterate through the input list.</li>
  <li>Check: <code>if (priority &gt;= 7)</code> then add to result.</li>
  <li>Return result without touching the original list.</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> findHighPriority(
            ArrayList<Integer> priorities) {
        ArrayList<Integer> result = new ArrayList<>();
        for (int priority : priorities) {
            if (priority >= 7) {
                result.add(priority);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> priorities = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            priorities.add(sc.nextInt());
        }
        ArrayList<Integer> result = findHighPriority(priorities);
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> findHighPriority(
            ArrayList<Integer> priorities) {
        // TODO: Return new list with values >= 7
        
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> priorities = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            priorities.add(sc.nextInt());
        }
        ArrayList<Integer> result = findHighPriority(priorities);
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "6\n3 7 5 9 7 2", expected: "7 9 7", description: "Filter values >= 7" },
      { input: "5\n1 2 3 4 5", expected: "", description: "No high-priority tasks" },
      { input: "4\n7 8 9 10", expected: "7 8 9 10", description: "All tasks are high priority" },
      { input: "3\n6 7 8", expected: "7 8", description: "7 and 8 qualify" },
      { input: "5\n10 1 7 3 9", expected: "10 7 9", description: "Order preserved" },
    ]
  },

  {
    id: 4,
    title: "Remove Cancelled IDs",
    difficulty: "Easy",
    collection: "ArrayList<Integer>",
    tags: ["ArrayList", "remove", "Integer.valueOf"],
    description: `<p>A conference maintains registered participant IDs in an <code>ArrayList&lt;Integer&gt;</code>.</p>
<p>Some participants cancel their registration. Given an array of cancelled IDs, <strong>remove every cancelled ID</strong> that currently exists in the list.</p>
<p>Return the updated collection.</p>

<h3>Key Insight</h3>
<p>Use <code>participants.remove(Integer.valueOf(id))</code> — NOT <code>participants.remove(id)</code> — to remove by <strong>value</strong>, not by index!</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Registered:</span><span class="ex-val">4<br>101 202 303 404</span></div>
<div class="ex-line"><span class="ex-key">Cancelled:</span><span class="ex-val">2<br>202 404</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">101 303</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Cancelled IDs may not be in the list (ignore gracefully)</li>
  <li>Input: n, then n participants, then c, then c cancelled IDs</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Loop through the cancelled array.</li>
  <li>For each ID, call: <code>participants.remove(Integer.valueOf(id));</code></li>
  <li>Why <code>Integer.valueOf()</code>? Because <code>remove(int)</code> removes by index, but <code>remove(Integer)</code> removes by value!</li>
  <li>If an ID is not in the list, nothing happens.</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> removeCancelled(
            ArrayList<Integer> participants,
            int[] cancelled) {
        for (int id : cancelled) {
            participants.remove(Integer.valueOf(id));
        }
        return participants;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> participants = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            participants.add(sc.nextInt());
        }
        int c = sc.nextInt();
        int[] cancelled = new int[c];
        for (int i = 0; i < c; i++) {
            cancelled[i] = sc.nextInt();
        }
        ArrayList<Integer> result = removeCancelled(participants, cancelled);
        for (int id : result) {
            System.out.print(id + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> removeCancelled(
            ArrayList<Integer> participants,
            int[] cancelled) {
        // TODO: Remove each cancelled ID from participants
        // Hint: use Integer.valueOf() to remove by value!
        
        return participants;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> participants = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            participants.add(sc.nextInt());
        }
        int c = sc.nextInt();
        int[] cancelled = new int[c];
        for (int i = 0; i < c; i++) {
            cancelled[i] = sc.nextInt();
        }
        ArrayList<Integer> result = removeCancelled(participants, cancelled);
        for (int id : result) {
            System.out.print(id + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "4\n101 202 303 404\n2\n202 404", expected: "101 303", description: "Remove 202 and 404" },
      { input: "3\n10 20 30\n1\n20", expected: "10 30", description: "Remove middle element" },
      { input: "3\n1 2 3\n1\n99", expected: "1 2 3", description: "Cancelled ID not in list" },
      { input: "5\n5 4 3 2 1\n3\n1 3 5", expected: "4 2", description: "Remove alternating elements" },
      { input: "4\n7 8 9 10\n4\n7 8 9 10", expected: "", description: "Remove all participants" },
    ]
  },

  {
    id: 5,
    title: "Maintain an Updated Queue",
    difficulty: "Medium",
    collection: "ArrayList<Integer>",
    tags: ["ArrayList", "remove", "contains", "two-step"],
    description: `<p>A training institute keeps a list of enrolled student IDs.</p>
<p>During the day:</p>
<ul>
  <li>Some students <strong>withdraw</strong> (remove their ID if it exists).</li>
  <li>New students <strong>request admission</strong> (add their ID only if not already present).</li>
</ul>
<p>Return the final <code>ArrayList</code> after both operations.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Enrolled:</span><span class="ex-val">4<br>101 102 103 104</span></div>
<div class="ex-line"><span class="ex-key">Withdrawn:</span><span class="ex-val">2<br>102 104</span></div>
<div class="ex-line"><span class="ex-key">New students:</span><span class="ex-val">3<br>105 101 106</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">101 103 105 106</span></div>
<div class="ex-explain">102 and 104 removed; 105 and 106 added; 101 already exists.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Input: n enrolled, then n IDs, then w withdrawn, then w IDs, then m new, then m IDs</li>
  <li>Operations must be performed in order: removals first, then additions</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li><strong>Step 1 - Removals:</strong> Loop through <code>withdrawn[]</code> and call <code>students.remove(Integer.valueOf(id))</code>.</li>
  <li><strong>Step 2 - Additions:</strong> Loop through <code>newStudents[]</code> and check <code>if (!students.contains(id))</code> before adding.</li>
  <li>Order matters — remove first, then add.</li>
  <li>Combining two previous problems (Q4 + Q1)!</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> updateStudents(
            ArrayList<Integer> students,
            int[] withdrawn,
            int[] newStudents) {
        for (int id : withdrawn) {
            students.remove(Integer.valueOf(id));
        }
        for (int id : newStudents) {
            if (!students.contains(id)) {
                students.add(id);
            }
        }
        return students;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> students = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            students.add(sc.nextInt());
        }
        int w = sc.nextInt();
        int[] withdrawn = new int[w];
        for (int i = 0; i < w; i++) {
            withdrawn[i] = sc.nextInt();
        }
        int m = sc.nextInt();
        int[] newStudents = new int[m];
        for (int i = 0; i < m; i++) {
            newStudents[i] = sc.nextInt();
        }
        ArrayList<Integer> result = updateStudents(students, withdrawn, newStudents);
        for (int id : result) {
            System.out.print(id + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static ArrayList<Integer> updateStudents(
            ArrayList<Integer> students,
            int[] withdrawn,
            int[] newStudents) {
        // TODO: Step 1 - Remove withdrawn students
        
        // TODO: Step 2 - Add new students (only if not already enrolled)
        
        return students;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> students = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            students.add(sc.nextInt());
        }
        int w = sc.nextInt();
        int[] withdrawn = new int[w];
        for (int i = 0; i < w; i++) {
            withdrawn[i] = sc.nextInt();
        }
        int m = sc.nextInt();
        int[] newStudents = new int[m];
        for (int i = 0; i < m; i++) {
            newStudents[i] = sc.nextInt();
        }
        ArrayList<Integer> result = updateStudents(students, withdrawn, newStudents);
        for (int id : result) {
            System.out.print(id + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "4\n101 102 103 104\n2\n102 104\n3\n105 101 106", expected: "101 103 105 106", description: "Remove 102,104; add 105,106; skip 101" },
      { input: "3\n1 2 3\n1\n2\n2\n4 5", expected: "1 3 4 5", description: "Remove 2, add 4 and 5" },
      { input: "2\n10 20\n0\n\n2\n30 40", expected: "10 20 30 40", description: "No withdrawals, two new students" },
      { input: "3\n5 6 7\n3\n5 6 7\n2\n5 8", expected: "5 8", description: "All removed then 5 re-added, 8 new" },
      { input: "2\n1 2\n1\n1\n1\n1", expected: "2 1", description: "Remove 1, add 1 back" },
    ]
  },

  {
    id: 6,
    title: "Detect Increasing Temperatures",
    difficulty: "Easy",
    collection: "LinkedList<Integer>",
    tags: ["LinkedList", "adjacent comparison", "trend"],
    description: `<p>A weather station stores daily temperatures in a <code>LinkedList&lt;Integer&gt;</code>.</p>
<p>Create a new <code>LinkedList</code> containing every temperature that is <strong>greater than the temperature recorded immediately before it</strong>.</p>
<p>The first temperature should <strong>not</strong> be included. Preserve the original order.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6<br>20 22 19 25 21 30</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">22 25 30</span></div>
<div class="ex-explain">22>20, 25>19, 30>21. Others decrease or don't change.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Start comparison from index 1</li>
  <li>Input: n on first line, then n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Start your loop from index <code>i = 1</code> (skip first element).</li>
  <li>Compare: <code>temperatures.get(i) &gt; temperatures.get(i - 1)</code></li>
  <li>If true, add <code>temperatures.get(i)</code> to result.</li>
  <li>Use <code>LinkedList</code> with <code>.get(i)</code> for index-based access.</li>
</ol>`,
    solution: `import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static LinkedList<Integer> findIncreases(
            LinkedList<Integer> temperatures) {
        LinkedList<Integer> result = new LinkedList<>();
        for (int i = 1; i < temperatures.size(); i++) {
            if (temperatures.get(i) > temperatures.get(i - 1)) {
                result.add(temperatures.get(i));
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedList<Integer> temperatures = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            temperatures.add(sc.nextInt());
        }
        LinkedList<Integer> result = findIncreases(temperatures);
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static LinkedList<Integer> findIncreases(
            LinkedList<Integer> temperatures) {
        LinkedList<Integer> result = new LinkedList<>();
        // TODO: Start from index 1, add temperatures that are
        //       greater than the previous one
        
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedList<Integer> temperatures = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            temperatures.add(sc.nextInt());
        }
        LinkedList<Integer> result = findIncreases(temperatures);
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "6\n20 22 19 25 21 30", expected: "22 25 30", description: "Three increases detected" },
      { input: "5\n10 9 8 7 6", expected: "", description: "Strictly decreasing - no increases" },
      { input: "4\n5 5 5 5", expected: "", description: "All equal - no increases" },
      { input: "3\n1 2 3", expected: "2 3", description: "All increasing" },
      { input: "5\n3 1 4 1 5", expected: "4 5", description: "Non-consecutive increases" },
    ]
  },

  {
    id: 7,
    title: "Find Increasing Scores",
    difficulty: "Easy",
    collection: "LinkedList<Integer>",
    tags: ["LinkedList", "adjacent comparison", "gaming"],
    description: `<p>A gaming application records player scores after each round in a <code>LinkedList&lt;Integer&gt;</code>.</p>
<p>Return a new list containing the scores that are <strong>strictly greater</strong> than the score from the previous round.</p>
<p>If there are no such scores, return an empty list.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>100 150 130 200 180</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">150 200</span></div>
<div class="ex-explain">150>100, 200>130. 130 and 180 decreased.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Similar to Q6 — same pattern, different context</li>
  <li>1 &le; n &le; 1000</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Very similar to the temperature problem (Q6)!</li>
  <li>Loop from <code>i = 1</code>, compare <code>current</code> and <code>previous</code> scores.</li>
  <li>Only add <code>current</code> if it is <strong>strictly greater</strong> than <code>previous</code>.</li>
</ol>`,
    solution: `import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static LinkedList<Integer> findImprovedScores(
            LinkedList<Integer> scores) {
        LinkedList<Integer> result = new LinkedList<>();
        for (int i = 1; i < scores.size(); i++) {
            int current = scores.get(i);
            int previous = scores.get(i - 1);
            if (current > previous) {
                result.add(current);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedList<Integer> scores = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            scores.add(sc.nextInt());
        }
        LinkedList<Integer> result = findImprovedScores(scores);
        for (int score : result) {
            System.out.print(score + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static LinkedList<Integer> findImprovedScores(
            LinkedList<Integer> scores) {
        LinkedList<Integer> result = new LinkedList<>();
        // TODO: Find all scores that are strictly greater than the previous
        
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedList<Integer> scores = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            scores.add(sc.nextInt());
        }
        LinkedList<Integer> result = findImprovedScores(scores);
        for (int score : result) {
            System.out.print(score + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n100 150 130 200 180", expected: "150 200", description: "Two score improvements" },
      { input: "3\n50 50 50", expected: "", description: "Equal scores — not strictly greater" },
      { input: "4\n10 20 30 40", expected: "20 30 40", description: "Always increasing" },
      { input: "5\n500 400 300 200 100", expected: "", description: "Always decreasing" },
      { input: "5\n1 5 3 8 2", expected: "5 8", description: "Mixed scores" },
    ]
  },

  {
    id: 8,
    title: "Find Repeated Visit IDs",
    difficulty: "Medium",
    collection: "LinkedList<Integer>",
    tags: ["LinkedList", "HashMap", "HashSet", "frequency"],
    description: `<p>A mobile application stores page IDs visited by a user in a <code>LinkedList&lt;Integer&gt;</code>.</p>
<p>A page is considered <strong>repeatedly visited</strong> if its ID occurs <strong>at least twice</strong>.</p>
<p>Create another <code>LinkedList</code> containing each repeated ID <strong>only once</strong>, in the order they <strong>first appeared</strong>. Do <strong>not</strong> modify the original list.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">7<br>5 7 5 9 5 7 3</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">5 7</span></div>
<div class="ex-explain">5 appears 3x, 7 appears 2x. Each in first-seen order. 9 and 3 appear once.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Use HashMap for frequency counting</li>
  <li>Use HashSet to track which IDs have been added to result</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li><strong>Pass 1:</strong> Build a <code>HashMap&lt;Integer, Integer&gt; frequency</code> counting occurrences of each page ID.</li>
  <li><strong>Pass 2:</strong> Traverse the original list again. If <code>frequency.get(page) &gt; 1</code> AND not already added to result, add it.</li>
  <li>Use a <code>HashSet&lt;Integer&gt; added</code> to track what's been added to the result.</li>
  <li>This preserves first-appearance order while avoiding duplicates in result.</li>
</ol>`,
    solution: `import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static LinkedList<Integer> findRepeatedPages(
            LinkedList<Integer> pages) {
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int page : pages) {
            frequency.put(page, frequency.getOrDefault(page, 0) + 1);
        }
        LinkedList<Integer> result = new LinkedList<>();
        HashSet<Integer> added = new HashSet<>();
        for (int page : pages) {
            if (frequency.get(page) > 1 && !added.contains(page)) {
                result.add(page);
                added.add(page);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedList<Integer> pages = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            pages.add(sc.nextInt());
        }
        LinkedList<Integer> result = findRepeatedPages(pages);
        for (int page : result) {
            System.out.print(page + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static LinkedList<Integer> findRepeatedPages(
            LinkedList<Integer> pages) {
        // TODO: Step 1 - Build frequency map
        HashMap<Integer, Integer> frequency = new HashMap<>();
        
        // TODO: Step 2 - Add repeated page IDs to result (only once each)
        LinkedList<Integer> result = new LinkedList<>();
        HashSet<Integer> added = new HashSet<>();
        
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedList<Integer> pages = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            pages.add(sc.nextInt());
        }
        LinkedList<Integer> result = findRepeatedPages(pages);
        for (int page : result) {
            System.out.print(page + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "7\n5 7 5 9 5 7 3", expected: "5 7", description: "5 and 7 repeated, in first-seen order" },
      { input: "4\n1 2 3 4", expected: "", description: "All unique - no repeats" },
      { input: "5\n1 1 1 1 1", expected: "1", description: "Only one unique repeated ID" },
      { input: "6\n3 4 3 4 5 6", expected: "3 4", description: "Two repeated IDs" },
      { input: "5\n9 8 9 7 8", expected: "9 8", description: "Order by first appearance" },
    ]
  },

  {
    id: 9,
    title: "Remove Duplicate Employee IDs",
    difficulty: "Easy",
    collection: "HashSet<Integer>",
    tags: ["HashSet", "duplicates", "unique"],
    description: `<p>A company receives a list of employee IDs from several departments. Some IDs may appear multiple times.</p>
<p>Use a <code>HashSet&lt;Integer&gt;</code> to create a collection containing every <strong>distinct</strong> employee ID. Display the unique IDs.</p>

<h3>Note</h3>
<p>Since <code>HashSet</code> does <strong>not preserve insertion order</strong>, the output order may vary. Check that your output contains exactly the right unique IDs.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">7<br>101 203 101 305 203 407 101</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">(any order) 101 203 305 407</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Output order not guaranteed (HashSet)</li>
  <li>Input: n on first line, then n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Create a <code>HashSet&lt;Integer&gt; employees = new HashSet&lt;&gt;()</code>.</li>
  <li>Add every ID from the input: <code>employees.add(sc.nextInt())</code>.</li>
  <li>HashSet automatically ignores duplicates!</li>
  <li>Then print all elements in the set.</li>
</ol>`,
    solution: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> employees = new HashSet<>();
        for (int i = 0; i < n; i++) {
            employees.add(sc.nextInt());
        }
        for (int id : employees) {
            System.out.print(id + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        // TODO: Use HashSet to collect unique employee IDs
        
        sc.close();
    }
}`,
    testCases: [
      { input: "7\n101 203 101 305 203 407 101", expected: "4", description: "Should have 4 unique IDs (check count)", checkCount: true },
      { input: "5\n1 2 3 4 5", expected: "5", description: "All unique - 5 distinct IDs", checkCount: true },
      { input: "4\n7 7 7 7", expected: "1", description: "All same - 1 distinct ID", checkCount: true },
      { input: "6\n10 20 30 10 20 30", expected: "3", description: "Three unique IDs", checkCount: true },
      { input: "3\n5 5 6", expected: "2", description: "Two unique IDs", checkCount: true },
    ]
  },

  {
    id: 10,
    title: "Find Common Product Codes",
    difficulty: "Medium",
    collection: "HashSet<Integer>",
    tags: ["HashSet", "intersection", "two sets"],
    description: `<p>Two warehouses maintain collections of product IDs.</p>
<p>Find all product IDs that are present in <strong>both</strong> warehouses. Each common ID should be printed <strong>only once</strong>.</p>

<h3>Approach</h3>
<ol>
  <li>Store Warehouse A's IDs in a <code>HashSet</code>.</li>
  <li>For each ID in Warehouse B, check if it exists in the first set.</li>
  <li>Add matching IDs to a result set.</li>
</ol>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Warehouse A:</span><span class="ex-val">4<br>101 202 303 404</span></div>
<div class="ex-line"><span class="ex-key">Warehouse B:</span><span class="ex-val">4<br>202 404 505 606</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">202 404 (any order)</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n, m &le; 1000</li>
  <li>Output order not guaranteed</li>
  <li>Input: n, n IDs for A, then m, m IDs for B</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Put all IDs from Warehouse A into <code>HashSet warehouseA</code>.</li>
  <li>Create another <code>HashSet common</code>.</li>
  <li>For each ID in Warehouse B: <code>if (warehouseA.contains(id)) common.add(id);</code></li>
  <li>Print the common set.</li>
</ol>`,
    solution: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> warehouseA = new HashSet<>();
        for (int i = 0; i < n; i++) {
            warehouseA.add(sc.nextInt());
        }
        int m = sc.nextInt();
        HashSet<Integer> common = new HashSet<>();
        for (int i = 0; i < m; i++) {
            int id = sc.nextInt();
            if (warehouseA.contains(id)) {
                common.add(id);
            }
        }
        for (int id : common) {
            System.out.print(id + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> warehouseA = new HashSet<>();
        for (int i = 0; i < n; i++) {
            warehouseA.add(sc.nextInt());
        }
        int m = sc.nextInt();
        // TODO: Find IDs present in both warehouses
        
        sc.close();
    }
}`,
    testCases: [
      { input: "4\n101 202 303 404\n4\n202 404 505 606", expected: "2", description: "2 common IDs (202, 404)", checkCount: true },
      { input: "3\n1 2 3\n3\n4 5 6", expected: "0", description: "No common IDs", checkCount: true },
      { input: "3\n1 2 3\n3\n1 2 3", expected: "3", description: "All IDs are common", checkCount: true },
      { input: "4\n10 20 30 40\n3\n20 40 60", expected: "2", description: "Two common IDs", checkCount: true },
      { input: "3\n5 10 15\n2\n10 15", expected: "2", description: "Both B elements are in A", checkCount: true },
    ]
  },

  {
    id: 11,
    title: "Find the Second Distinct Lowest Value",
    difficulty: "Medium",
    collection: "HashSet<Integer>",
    tags: ["HashSet", "sorting", "second minimum"],
    description: `<p>For each test case, you are given a list of integers. Find the <strong>second smallest distinct value</strong>.</p>
<p>If all elements are identical or there is only one distinct value, print <strong>0</strong>.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">2<br>6<br>20 5 15 5 10 20<br>3<br>7 7 7</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">10<br>0</span></div>
<div class="ex-explain">Unique values of first test: {5,10,15,20}. Sorted: 5,10,15,20. Second = 10.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; T &le; 100</li>
  <li>1 &le; n &le; 1000</li>
  <li>Input: T test cases. Each: n, then n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Insert all values into a <code>HashSet</code> to remove duplicates.</li>
  <li>Convert the set to an <code>ArrayList</code>.</li>
  <li>Sort using <code>Collections.sort()</code>.</li>
  <li>If <code>unique.size() &lt; 2</code>, return 0. Else return <code>values.get(1)</code>.</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static int secondMinimum(int[] arr) {
        HashSet<Integer> unique = new HashSet<>();
        for (int value : arr) {
            unique.add(value);
        }
        if (unique.size() < 2) {
            return 0;
        }
        ArrayList<Integer> values = new ArrayList<>(unique);
        Collections.sort(values);
        return values.get(1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = sc.nextInt();
            }
            System.out.println(secondMinimum(arr));
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static int secondMinimum(int[] arr) {
        // TODO:
        // 1. Add all to HashSet (removes duplicates)
        // 2. If less than 2 distinct values, return 0
        // 3. Convert to ArrayList, sort, return index 1
        
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = sc.nextInt();
            }
            System.out.println(secondMinimum(arr));
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "1\n6\n20 5 15 5 10 20", expected: "10", description: "Second distinct smallest is 10" },
      { input: "1\n3\n7 7 7", expected: "0", description: "Only one distinct value" },
      { input: "1\n4\n1 2 3 4", expected: "2", description: "Second smallest is 2" },
      { input: "2\n4\n5 3 5 3\n5\n1 1 1 2 2", expected: "5\n2", description: "Two test cases" },
      { input: "1\n5\n100 1 50 1 100", expected: "50", description: "Duplicates present" },
    ]
  },

  {
    id: 12,
    title: "Count Product Frequencies",
    difficulty: "Medium",
    collection: "HashMap<Integer,Integer>",
    tags: ["HashMap", "frequency", "getOrDefault"],
    description: `<p>An online store records product codes for every purchase. Determine how many times each product code occurs.</p>
<p>Use a <code>HashMap&lt;Integer, Integer&gt;</code> to store the frequency of every product. Display each product code together with its frequency.</p>

<h3>Key Pattern</h3>
<p>Use: <code>map.put(code, map.getOrDefault(code, 0) + 1);</code></p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6<br>101 205 101 310 205 101</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">101 3<br>205 2<br>310 1<br>(any order)</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Output: one "code frequency" per line (any order)</li>
  <li>Input: n on first line, then n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Create <code>HashMap&lt;Integer,Integer&gt; frequency = new HashMap&lt;&gt;()</code>.</li>
  <li>For each code, use: <code>frequency.put(code, frequency.getOrDefault(code, 0) + 1);</code></li>
  <li><code>getOrDefault(code, 0)</code> returns 0 if key doesn't exist yet.</li>
  <li>Iterate entries with <code>for (Map.Entry&lt;Integer,Integer&gt; entry : frequency.entrySet())</code></li>
</ol>`,
    solution: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int code = sc.nextInt();
            frequency.put(code, frequency.getOrDefault(code, 0) + 1);
        }
        for (Map.Entry<Integer, Integer> entry : frequency.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        // TODO: Count frequency of each product code
        
        // TODO: Print each code and its frequency
        
        sc.close();
    }
}`,
    testCases: [
      { input: "6\n101 205 101 310 205 101", expected: "3", description: "3 unique codes with correct frequencies", checkCount: true },
      { input: "4\n1 2 3 4", expected: "4", description: "All unique - 4 codes each with freq 1", checkCount: true },
      { input: "5\n7 7 7 7 7", expected: "1", description: "One code with frequency 5", checkCount: true },
      { input: "3\n10 20 10", expected: "2", description: "Two unique codes", checkCount: true },
      { input: "6\n5 5 6 6 7 7", expected: "3", description: "Three codes each appearing twice", checkCount: true },
    ]
  },

  {
    id: 13,
    title: "Find the First Unique Character",
    difficulty: "Medium",
    collection: "HashMap<Character,Integer>",
    tags: ["HashMap", "String", "first unique", "frequency"],
    description: `<p>A messaging application receives a lowercase string.</p>
<p>Find the <strong>first character that appears exactly once</strong>. Print its <strong>index</strong>.</p>
<p>If every character occurs more than once, print <strong>-1</strong>.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">swiss</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">1</span></div>
<div class="ex-explain">Frequencies: s=3, w=1, i=1. First unique is 'w' at index 1.</div>
</div>

<h3>Example 2</h3>
<div class="example-block">
<div class="ex-label">Example 2</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">aabb</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">-1</span></div>
<div class="ex-explain">All characters appear more than once.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Input: lowercase string (single line)</li>
  <li>1 &le; string length &le; 10000</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li><strong>Pass 1:</strong> Build <code>HashMap&lt;Character,Integer&gt; frequency</code> counting each character.</li>
  <li><strong>Pass 2:</strong> Iterate through the string by index. Find the first char with <code>frequency.get(ch) == 1</code>.</li>
  <li>Return that index. If none found, return -1.</li>
  <li>Use <code>text.toCharArray()</code> or <code>text.charAt(i)</code>.</li>
</ol>`,
    solution: `import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static int firstUniqueIndex(String text) {
        HashMap<Character, Integer> frequency = new HashMap<>();
        for (char ch : text.toCharArray()) {
            frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);
        }
        for (int i = 0; i < text.length(); i++) {
            if (frequency.get(text.charAt(i)) == 1) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine();
        System.out.println(firstUniqueIndex(text));
        sc.close();
    }
}`,
    starterCode: `import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static int firstUniqueIndex(String text) {
        // TODO: Step 1 - Count frequency of each character
        HashMap<Character, Integer> frequency = new HashMap<>();
        
        // TODO: Step 2 - Find first character with frequency 1
        
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine();
        System.out.println(firstUniqueIndex(text));
        sc.close();
    }
}`,
    testCases: [
      { input: "swiss", expected: "1", description: "'w' at index 1 is first unique" },
      { input: "aabb", expected: "-1", description: "No unique character" },
      { input: "leetcode", expected: "0", description: "'l' at index 0 is first unique" },
      { input: "aab", expected: "2", description: "'b' at index 2" },
      { input: "abcabc", expected: "-1", description: "All characters appear twice" },
    ]
  },

  {
    id: 14,
    title: "Preserve Unique Notification Types",
    difficulty: "Easy",
    collection: "LinkedHashSet<String>",
    tags: ["LinkedHashSet", "insertion order", "duplicates"],
    description: `<p>A monitoring system receives notification types in the order they are generated.</p>
<p>For example: <code>EMAIL SMS EMAIL ALERT SMS PUSH</code></p>
<p>Create a collection that contains each notification type <strong>only once</strong> while <strong>preserving its first appearance order</strong>. Use an appropriate Java collection.</p>

<h3>Key Concept</h3>
<p>Use <code>LinkedHashSet&lt;String&gt;</code> — unlike <code>HashSet</code>, it maintains <strong>insertion order</strong> while eliminating duplicates.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6<br>EMAIL SMS EMAIL ALERT SMS PUSH</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">EMAIL SMS ALERT PUSH</span></div>
<div class="ex-explain">Duplicates removed while preserving first occurrence order.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Input: n on first line, then n strings</li>
  <li>Must use LinkedHashSet for order preservation</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Create <code>LinkedHashSet&lt;String&gt; notifications = new LinkedHashSet&lt;&gt;()</code>.</li>
  <li>Simply <code>notifications.add(sc.next())</code> for each input — duplicates auto-ignored!</li>
  <li><code>LinkedHashSet</code> = <code>HashSet</code> (no duplicates) + maintains insertion order.</li>
  <li>Print all elements — they'll be in first-appearance order.</li>
</ol>`,
    solution: `import java.util.LinkedHashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedHashSet<String> notifications = new LinkedHashSet<>();
        for (int i = 0; i < n; i++) {
            notifications.add(sc.next());
        }
        for (String type : notifications) {
            System.out.print(type + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.LinkedHashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        // TODO: Use LinkedHashSet to preserve order and remove duplicates
        
        sc.close();
    }
}`,
    testCases: [
      { input: "6\nEMAIL SMS EMAIL ALERT SMS PUSH", expected: "EMAIL SMS ALERT PUSH", description: "Duplicates removed, order preserved" },
      { input: "3\nA B C", expected: "A B C", description: "All unique, same order" },
      { input: "5\nX X X X X", expected: "X", description: "All same type" },
      { input: "4\nSMS EMAIL SMS EMAIL", expected: "SMS EMAIL", description: "Two types alternating" },
      { input: "5\nPUSH ALERT EMAIL PUSH ALERT", expected: "PUSH ALERT EMAIL", description: "Order of first appearances" },
    ]
  },

  {
    id: 15,
    title: "Analyze Repeated Student Activity",
    difficulty: "Hard",
    collection: "HashMap + ArrayList",
    tags: ["HashMap", "ArrayList", "frequency", "tie-breaking"],
    description: `<p>A learning platform records the IDs of students who accessed a particular course.</p>
<p>You must determine:</p>
<ol>
  <li>How many <strong>distinct students</strong> accessed the course.</li>
  <li>Which student accessed it the <strong>maximum number of times</strong>.</li>
  <li>The <strong>frequency</strong> of that student.</li>
</ol>
<p>If multiple students have the same highest frequency, choose the student whose <strong>first appearance occurred earlier</strong>.</p>

<h3>Example 1</h3>
<div class="example-block">
<div class="ex-label">Example 1</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6<br>12 15 12 18 15 12</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">3<br>12<br>3</span></div>
<div class="ex-explain">Distinct: 3 students. Student 12 has max freq (3). Output: count, ID, freq.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Tie-breaking: earlier first-appearance wins</li>
  <li>Output: 3 lines — distinct count, most frequent ID, frequency</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Build a <code>HashMap&lt;Integer,Integer&gt; frequency</code> from the ArrayList.</li>
  <li>Distinct count = <code>frequency.size()</code>.</li>
  <li>Initialize <code>bestStudent = accesses.get(0)</code> and <code>bestFrequency = frequency.get(bestStudent)</code>.</li>
  <li>Traverse the original ArrayList (preserves order for tie-breaking). If <code>currentFrequency &gt; bestFrequency</code>, update best. Use <code>&gt;</code> not <code>&gt;=</code> to keep first in case of tie.</li>
</ol>`,
    solution: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static void analyze(ArrayList<Integer> accesses) {
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int student : accesses) {
            frequency.put(student, frequency.getOrDefault(student, 0) + 1);
        }
        int distinctStudents = frequency.size();
        int bestStudent = accesses.get(0);
        int bestFrequency = frequency.get(bestStudent);
        for (int student : accesses) {
            int currentFrequency = frequency.get(student);
            if (currentFrequency > bestFrequency) {
                bestFrequency = currentFrequency;
                bestStudent = student;
            }
        }
        System.out.println(distinctStudents);
        System.out.println(bestStudent);
        System.out.println(bestFrequency);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> accesses = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            accesses.add(sc.nextInt());
        }
        analyze(accesses);
        sc.close();
    }
}`,
    starterCode: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {
    public static void analyze(ArrayList<Integer> accesses) {
        // TODO: Step 1 - Build frequency map
        HashMap<Integer, Integer> frequency = new HashMap<>();
        
        // TODO: Step 2 - Count distinct students
        
        // TODO: Step 3 - Find most frequent student
        //       (tie-break: earlier first appearance wins)
        
        // TODO: Print: distinct count, best student ID, best frequency
        
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> accesses = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            accesses.add(sc.nextInt());
        }
        analyze(accesses);
        sc.close();
    }
}`,
    testCases: [
      { input: "6\n12 15 12 18 15 12", expected: "3\n12\n3", description: "Student 12 tops with 3 accesses" },
      { input: "4\n1 2 3 4", expected: "4\n1\n1", description: "All equal freq — first student (1) wins" },
      { input: "5\n7 7 7 7 7", expected: "1\n7\n5", description: "Only one student" },
      { input: "6\n3 4 3 4 3 4", expected: "2\n3\n3", description: "Tie: 3 and 4 both freq 3, student 3 appears first" },
      { input: "7\n10 20 30 10 20 30 10", expected: "3\n10\n3", description: "Student 10 has highest freq" },
    ]
  }
];
