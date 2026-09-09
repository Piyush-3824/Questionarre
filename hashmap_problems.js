// hashmap_problems.js - 15 HashMap & TreeMap Practice Questions
// Source: "HashMap and TreeMap: Important Questions - Notes.pdf"

const HASHMAP_PROBLEMS = [
  {
    id: 100,
    title: "Count Frequency of Elements",
    difficulty: "Easy",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "frequency", "getOrDefault"],
    description: `<p>Given an integer array, count how many times each element occurs.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">7<br>2 3 2 5 3 2 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">2 -&gt; 3<br>3 -&gt; 2<br>5 -&gt; 2</span></div>
<div class="ex-explain">Use a HashMap&lt;Integer, Integer&gt; — Key = element, Value = frequency</div>
</div>

<h3>Method Signature</h3>
<div class="example-block">
<div class="ex-label">Required</div>
<div class="ex-val">Read n integers, print each element with its frequency as "element -&gt; freq"</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Elements can be any integer</li>
  <li>Output order may vary (HashMap does not guarantee order)</li>
  <li>Input: first line = n, second line = n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Create a <code>HashMap&lt;Integer, Integer&gt; frequency</code>.</li>
  <li>For each element: <code>frequency.put(value, frequency.getOrDefault(value, 0) + 1)</code></li>
  <li>Iterate over <code>frequency.entrySet()</code> and print each key-value pair.</li>
  <li><code>getOrDefault(key, 0)</code> returns 0 if the key doesn't exist yet.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            frequency.put(value, frequency.getOrDefault(value, 0) + 1);
        }
        TreeMap<Integer, Integer> sorted = new TreeMap<>(frequency);
        for (Map.Entry<Integer, Integer> entry : sorted.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            // TODO: Update frequency of 'value' in the map
        }
        // TODO: Print each entry as "key -> value" (use TreeMap for sorted output)
        sc.close();
    }
}`,
    testCases: [
      { input: "7\n2 3 2 5 3 2 5",        expected: "2 -> 3\n3 -> 2\n5 -> 2",          description: "Three distinct elements with varied counts" },
      { input: "5\n1 1 1 1 1",              expected: "1 -> 5",                           description: "All elements identical" },
      { input: "4\n10 20 30 40",            expected: "10 -> 1\n20 -> 1\n30 -> 1\n40 -> 1", description: "All elements distinct, frequency 1 each" },
      { input: "6\n1 2 1 2 1 2",            expected: "1 -> 3\n2 -> 3",                   description: "Two elements alternating, equal frequencies" },
      { input: "8\n5 1 5 2 5 2 1 5",        expected: "1 -> 2\n2 -> 2\n5 -> 4",           description: "One dominant element plus two equal ones" },
      { input: "3\n100 200 100",             expected: "100 -> 2\n200 -> 1",               description: "Small array with one repeat" },
    ]
  },

  {
    id: 101,
    title: "Count Frequency of Characters",
    difficulty: "Easy",
    collection: "HashMap<Character, Integer>",
    tags: ["HashMap", "character frequency", "toCharArray"],
    description: `<p>Given a string, count the frequency of every character.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">aab</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">a -&gt; 2<br>b -&gt; 1</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Input: one lowercase string on a single line</li>
  <li>Output in alphabetical order (use TreeMap)</li>
  <li>Use <code>HashMap&lt;Character, Integer&gt;</code></li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Use <code>str.toCharArray()</code> to iterate over characters.</li>
  <li>For each char: <code>frequency.put(ch, frequency.getOrDefault(ch, 0) + 1)</code></li>
  <li>Wrap in a <code>TreeMap</code> for sorted alphabetical output.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        HashMap<Character, Integer> frequency = new HashMap<>();
        for (char ch : str.toCharArray()) {
            frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);
        }
        TreeMap<Character, Integer> sorted = new TreeMap<>(frequency);
        for (Map.Entry<Character, Integer> entry : sorted.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        HashMap<Character, Integer> frequency = new HashMap<>();
        // TODO: Count frequency of each character in str
        // TODO: Print each character and its frequency as "ch -> freq" (sorted)
        sc.close();
    }
}`,
    testCases: [
      { input: "aab",          expected: "a -> 2\nb -> 1",                              description: "Two chars, one repeated" },
      { input: "abc",          expected: "a -> 1\nb -> 1\nc -> 1",                     description: "All distinct lowercase characters" },
      { input: "aaa",          expected: "a -> 3",                                     description: "Single character repeated 3 times" },
      { input: "abcabc",       expected: "a -> 2\nb -> 2\nc -> 2",                     description: "Each char appears exactly twice" },
      { input: "mississippi",  expected: "i -> 4\nm -> 1\np -> 2\ns -> 4",             description: "Classic word with many repeats" },
      { input: "zz",           expected: "z -> 2",                                     description: "Single repeated character at end of alphabet" },
    ]
  },

  {
    id: 102,
    title: "Find the First Repeating Element",
    difficulty: "Easy",
    collection: "HashSet<Integer>",
    tags: ["HashSet", "first repeating", "seen set"],
    description: `<p>Given an array, find the first element that appears more than once (when scanning left to right).</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">7<br>5 3 4 3 5 6 7</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">3</span></div>
<div class="ex-explain">When scanning left to right, 3 is the first element seen for the second time (at index 3).</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Print -1 if no element repeats</li>
  <li>Input: first line = n, second line = n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Maintain a <code>HashSet&lt;Integer&gt; seen</code>.</li>
  <li>For each element: if it's already in the set → it's the first repeating element.</li>
  <li>Otherwise, add it to the set and continue.</li>
  <li>Print -1 if the loop finishes without finding any repeating element.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> seen = new HashSet<>();
        int answer = -1;
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            if (answer == -1 && seen.contains(value)) {
                answer = value;
            }
            seen.add(value);
        }
        System.out.println(answer);
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> seen = new HashSet<>();
        int answer = -1;
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            // TODO: Check if value is already seen; if so, record as answer (once)
            // TODO: Add value to seen
        }
        System.out.println(answer);
        sc.close();
    }
}`,
    testCases: [
      { input: "7\n5 3 4 3 5 6 7",   expected: "3",  description: "3 repeats before 5" },
      { input: "4\n1 2 3 4",          expected: "-1", description: "No repeating element" },
      { input: "5\n1 1 2 2 3",        expected: "1",  description: "First element repeats immediately" },
      { input: "6\n9 8 7 6 5 9",      expected: "9",  description: "Repeat at the very end" },
      { input: "5\n4 3 2 1 4",        expected: "4",  description: "First element repeats last" },
      { input: "1\n42",               expected: "-1", description: "Single element, cannot repeat" },
    ]
  },

  {
    id: 103,
    title: "Find the First Non-Repeating Character",
    difficulty: "Easy",
    collection: "HashMap<Character, Integer>",
    tags: ["HashMap", "non-repeating", "two-pass"],
    description: `<p>Given a string, find the first character that appears exactly once.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">swiss</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">w</span></div>
<div class="ex-explain">s appears 3 times, w appears once → w is the first non-repeating character.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Input: a single lowercase string</li>
  <li>Print "No non-repeating character" if all characters repeat</li>
  <li>Use two passes: first count frequencies, then find first char with frequency 1</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Pass 1: Count frequency of each character in a HashMap.</li>
  <li>Pass 2: Scan the string again and return the first character with frequency == 1.</li>
  <li>This preserves the original order of appearance.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        HashMap<Character, Integer> frequency = new HashMap<>();
        for (char ch : str.toCharArray()) {
            frequency.put(ch, frequency.getOrDefault(ch, 0) + 1);
        }
        char answer = '\\0';
        for (char ch : str.toCharArray()) {
            if (frequency.get(ch) == 1) {
                answer = ch;
                break;
            }
        }
        if (answer == '\\0') {
            System.out.println("No non-repeating character");
        } else {
            System.out.println(answer);
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        HashMap<Character, Integer> frequency = new HashMap<>();
        // TODO: Pass 1 - count frequency of each character
        char answer = '\\0';
        // TODO: Pass 2 - find first character with frequency 1
        if (answer == '\\0') {
            System.out.println("No non-repeating character");
        } else {
            System.out.println(answer);
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "swiss",       expected: "w",                             description: "w is the first non-repeating char" },
      { input: "aabb",        expected: "No non-repeating character",    description: "All characters repeat in pairs" },
      { input: "abcabc",      expected: "No non-repeating character",    description: "All repeat equally" },
      { input: "leetcode",    expected: "l",                             description: "l appears once and is first" },
      { input: "aabbc",       expected: "c",                             description: "Only the last character is unique" },
      { input: "z",           expected: "z",                             description: "Single character string" },
    ]
  },

  {
    id: 104,
    title: "Check if Two Arrays Have the Same Frequency",
    difficulty: "Easy",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "frequency matching", "containsKey"],
    description: `<p>Given two arrays of the same size, determine whether both arrays contain exactly the same elements with the same frequencies.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>1 2 2 3 4<br>4 2 3 2 1</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">true</span></div>
<div class="ex-explain">Both arrays contain the same elements (1,2,2,3,4) regardless of order.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Both arrays have the same length n</li>
  <li>Input: first line = n, second line = first array, third line = second array</li>
  <li>Print "true" or "false"</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Build a frequency map for the first array.</li>
  <li>For each element in the second array: if it's not in the map or count is 0, set same = false.</li>
  <li>Otherwise, decrease its count in the map.</li>
  <li>Print the result as true or false.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            map.put(value, map.getOrDefault(value, 0) + 1);
        }
        boolean same = true;
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            if (!map.containsKey(value) || map.get(value) == 0) {
                same = false;
            } else {
                map.put(value, map.get(value) - 1);
            }
        }
        System.out.println(same);
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        // TODO: Build frequency map for first array
        boolean same = true;
        // TODO: Check second array against the map; decrease frequency as matched
        System.out.println(same);
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n1 2 2 3 4\n4 2 3 2 1",     expected: "true",  description: "Same elements, different order" },
      { input: "3\n1 2 3\n1 2 4",               expected: "false", description: "Different elements" },
      { input: "4\n1 1 2 2\n1 2 1 2",           expected: "true",  description: "Same frequencies, shuffled" },
      { input: "3\n1 1 2\n1 2 2",               expected: "false", description: "Same elements but different frequencies" },
      { input: "1\n7\n7",                        expected: "true",  description: "Single element arrays match" },
      { input: "4\n5 5 5 5\n5 5 5 1",           expected: "false", description: "One mismatch at the end" },
    ]
  },

  {
    id: 105,
    title: "Find Two Numbers with a Given Sum",
    difficulty: "Medium",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "two sum", "complement lookup"],
    description: `<p>Given an array and a target value, find two numbers whose sum equals the target.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>2 7 11 15 3<br>9</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">2 7</span></div>
<div class="ex-explain">2 + 7 = 9. Print the complement first, then the current element.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Input: first line = n, second line = n integers, third line = target</li>
  <li>Print "No pair found" if no valid pair exists</li>
  <li>Print the pair in the order they are discovered</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>For every element x, calculate <code>required = target - x</code>.</li>
  <li>Check if <code>required</code> is already in the map.</li>
  <li>If yes → print "required x" and stop.</li>
  <li>Otherwise, add x to the map with its index.</li>
  <li>This is the classic Two Sum pattern using HashMap.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        boolean found = false;
        for (int i = 0; i < n; i++) {
            int required = target - arr[i];
            if (map.containsKey(required)) {
                System.out.println(required + " " + arr[i]);
                found = true;
                break;
            }
            map.put(arr[i], i);
        }
        if (!found) {
            System.out.println("No pair found");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int target = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        boolean found = false;
        for (int i = 0; i < n; i++) {
            int required = target - arr[i];
            // TODO: Check if 'required' is already in map
            // TODO: If yes, print the pair and set found = true, break
            // TODO: Otherwise, add arr[i] to map
        }
        if (!found) {
            System.out.println("No pair found");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n2 7 11 15 3\n9",    expected: "2 7",           description: "2 + 7 = 9" },
      { input: "4\n1 2 3 4\n10",        expected: "No pair found", description: "No pair sums to 10" },
      { input: "3\n5 1 3\n4",           expected: "1 3",           description: "1 + 3 = 4" },
      { input: "6\n0 4 3 0 -1 9\n-1",  expected: "0 -1",          description: "Negative target with zero in array" },
      { input: "2\n6 4\n10",            expected: "6 4",           description: "Minimal array with valid pair" },
      { input: "5\n1 5 3 7 2\n20",      expected: "No pair found", description: "Target too large for any pair" },
    ]
  },

  {
    id: 106,
    title: "Find the Most Frequent Element",
    difficulty: "Medium",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "max frequency", "entrySet"],
    description: `<p>Given an integer array, find the element having the highest frequency.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">8<br>4 2 4 3 2 4 5 2</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">4</span></div>
<div class="ex-explain">4 appears 3 times — the highest. If tied, the first maximum found wins.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Input: first line = n, second line = n integers</li>
  <li>Return the element achieving the maximum frequency</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Build a frequency HashMap.</li>
  <li>Iterate over the map's entrySet.</li>
  <li>Track the key with the maximum value (frequency).</li>
  <li>Print that key at the end.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            map.put(value, map.getOrDefault(value, 0) + 1);
        }
        int answer = 0;
        int maxFrequency = 0;
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if (entry.getValue() > maxFrequency) {
                maxFrequency = entry.getValue();
                answer = entry.getKey();
            }
        }
        System.out.println(answer);
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            // TODO: Update frequency of value
        }
        int answer = 0;
        int maxFrequency = 0;
        // TODO: Find the key with the highest frequency
        System.out.println(answer);
        sc.close();
    }
}`,
    testCases: [
      { input: "8\n4 2 4 3 2 4 5 2",   expected: "4",  description: "4 has highest frequency (3)" },
      { input: "6\n7 7 7 7 7 7",        expected: "7",  description: "All same element" },
      { input: "5\n3 1 3 2 3",          expected: "3",  description: "3 appears most times" },
      { input: "7\n9 8 9 7 8 9 6",      expected: "9",  description: "9 appears 3 times, others less" },
      { input: "4\n100 200 100 300",     expected: "100",description: "Large values, 100 repeats" },
      { input: "6\n1 2 3 1 2 1",        expected: "1",  description: "1 appears 3 times, 2 appears twice" },
    ]
  },

  {
    id: 107,
    title: "Group Elements with Same Frequency",
    difficulty: "Medium",
    collection: "HashMap<Integer, ArrayList<Integer>>",
    tags: ["HashMap", "grouping", "computeIfAbsent"],
    description: `<p>Given an array, group all elements according to their frequency. Print each frequency group in ascending order of frequency, with elements sorted within each group.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">8<br>1 1 2 2 2 3 4 4</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">Frequency 1: 3<br>Frequency 2: 1 4<br>Frequency 3: 2</span></div>
<div class="ex-explain">1→2, 2→3, 3→1, 4→2 — grouped by frequency, elements sorted within group.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Input: first line = n, second line = n integers</li>
  <li>Print groups in ascending order of frequency</li>
  <li>Elements within a group must be sorted ascending</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>First build <code>frequency: element → count</code>.</li>
  <li>Then build <code>groups: count → list of elements</code> using <code>computeIfAbsent</code>.</li>
  <li>Use <code>TreeMap</code> to iterate groups in sorted frequency order.</li>
  <li>Sort each group list before printing.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            frequency.put(value, frequency.getOrDefault(value, 0) + 1);
        }
        TreeMap<Integer, ArrayList<Integer>> groups = new TreeMap<>();
        for (Map.Entry<Integer, Integer> entry : frequency.entrySet()) {
            int value = entry.getKey();
            int freq = entry.getValue();
            groups.computeIfAbsent(freq, k -> new ArrayList<>()).add(value);
        }
        for (Map.Entry<Integer, ArrayList<Integer>> entry : groups.entrySet()) {
            System.out.print("Frequency " + entry.getKey() + ": ");
            Collections.sort(entry.getValue());
            for (int value : entry.getValue()) {
                System.out.print(value + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            // TODO: Update frequency map
        }
        TreeMap<Integer, ArrayList<Integer>> groups = new TreeMap<>();
        // TODO: Group elements by their frequency using groups.computeIfAbsent(...)
        for (Map.Entry<Integer, ArrayList<Integer>> entry : groups.entrySet()) {
            System.out.print("Frequency " + entry.getKey() + ": ");
            // TODO: Sort and print all elements in this group
            System.out.println();
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "8\n1 1 2 2 2 3 4 4",   expected: "Frequency 1: 3 \nFrequency 2: 1 4 \nFrequency 3: 2 ", description: "Three distinct frequency buckets" },
      { input: "4\n1 2 3 4",            expected: "Frequency 1: 1 2 3 4 ",                               description: "All distinct, one group" },
      { input: "6\n5 5 5 5 5 5",        expected: "Frequency 6: 5 ",                                     description: "All same element, one group" },
      { input: "6\n3 3 1 1 2 2",        expected: "Frequency 2: 1 2 3 ",                                 description: "All freq 2, elements sorted in group" },
      { input: "9\n1 2 2 3 3 3 4 4 4",  expected: "Frequency 1: 1 \nFrequency 2: 2 \nFrequency 3: 3 4 ", description: "Mixed groups, 3 and 4 share freq 3" },
      { input: "5\n7 7 8 9 9",          expected: "Frequency 1: 8 \nFrequency 2: 7 9 ",                  description: "Two groups; 7 and 9 share freq 2" },
    ]
  },

  {
    id: 108,
    title: "Find Common Elements with Frequency",
    difficulty: "Medium",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "intersection", "frequency matching"],
    description: `<p>Given two arrays, print the common elements considering their frequencies.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Array 1:</span><span class="ex-val">5<br>1 2 2 3 4</span></div>
<div class="ex-line"><span class="ex-key">Array 2:</span><span class="ex-val">5<br>2 2 2 3 5</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">2 2 3</span></div>
<div class="ex-explain">2 occurs 2 times in both, 3 occurs 1 time in both. The extra 2 in array 2 is ignored.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n, m &le; 1000</li>
  <li>Input: n, then n integers (array 1), then m, then m integers (array 2)</li>
  <li>Print common elements space-separated in the order they appear in array 2</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Store frequency of array 1 in a HashMap.</li>
  <li>For each element in array 2: if its frequency in the map is &gt; 0, print it and decrement.</li>
  <li>This handles duplicates correctly — only as many as appear in both arrays.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            map.put(value, map.getOrDefault(value, 0) + 1);
        }
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            int value = sc.nextInt();
            if (map.getOrDefault(value, 0) > 0) {
                System.out.print(value + " ");
                map.put(value, map.get(value) - 1);
            }
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> map = new HashMap<>();
        // TODO: Build frequency map for first array
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            int value = sc.nextInt();
            // TODO: If value exists with freq > 0, print it and decrement freq
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n1 2 2 3 4\n5\n2 2 2 3 5",   expected: "2 2 3 ",    description: "2 matched twice, 3 once, extra 2 ignored" },
      { input: "3\n1 2 3\n3\n4 5 6",            expected: "",          description: "No common elements" },
      { input: "4\n1 1 2 3\n4\n1 1 1 2",        expected: "1 1 2 ",   description: "1 matched twice, 2 once, extra 1 ignored" },
      { input: "3\n5 5 5\n3\n5 5 5",            expected: "5 5 5 ",   description: "Both arrays identical, all match" },
      { input: "4\n10 20 30 40\n3\n20 50 30",   expected: "20 30 ",   description: "Two matches from larger first array" },
      { input: "2\n7 8\n2\n8 7",                expected: "8 7 ",     description: "Same elements, different order, both match" },
    ]
  },

  {
    id: 109,
    title: "Sort Elements by Frequency",
    difficulty: "Medium",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "custom sort", "frequency sort"],
    description: `<p>Given an array, arrange elements according to their frequency. Elements with higher frequency come first. If two elements have the same frequency, the smaller value comes first.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">8<br>4 2 4 3 2 4 5 2</span></div>
<div class="ex-line"><span class="ex-key">Frequencies:</span><span class="ex-val">4→3, 2→3, 3→1, 5→1</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">2 2 2 4 4 4 3 5</span></div>
<div class="ex-explain">2 and 4 both appear 3 times; 2 is smaller so it goes first. 3 and 5 (1 time each), 3 first.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 1000</li>
  <li>Sort: higher frequency first; tie-break by smaller value first</li>
  <li>Input: first line = n, second line = n integers</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Build a frequency HashMap.</li>
  <li>Add all elements to an ArrayList.</li>
  <li>Sort using a custom comparator: compare by <code>frequency.get(b) - frequency.get(a)</code>.</li>
  <li>For equal frequencies, sort by value: <code>Integer.compare(a, b)</code>.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            list.add(value);
            frequency.put(value, frequency.getOrDefault(value, 0) + 1);
        }
        list.sort((a, b) -> {
            int freqA = frequency.get(a);
            int freqB = frequency.get(b);
            if (freqA != freqB) {
                return Integer.compare(freqB, freqA);
            }
            return Integer.compare(a, b);
        });
        for (int value : list) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            list.add(value);
            // TODO: Update frequency map
        }
        // TODO: Sort list by frequency (descending), then by value (ascending) for ties
        for (int value : list) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "8\n4 2 4 3 2 4 5 2",   expected: "2 2 2 4 4 4 3 5 ", description: "Freq-sorted desc; ties broken by value asc" },
      { input: "4\n1 2 3 4",            expected: "1 2 3 4 ",         description: "All freq 1, sorted by value ascending" },
      { input: "5\n5 5 5 1 1",          expected: "5 5 5 1 1 ",       description: "5 appears most, 1 second" },
      { input: "6\n3 1 3 1 3 1",        expected: "1 1 1 3 3 3 ",     description: "Two elements with same freq 3; 1 < 3 so 1 first" },
      { input: "7\n7 7 5 5 5 3 1",      expected: "5 5 5 7 7 1 3 ",   description: "5 most frequent, 7 second, 1 and 3 last" },
      { input: "3\n9 9 1",              expected: "9 9 1 ",            description: "9 appears twice, 1 once" },
    ]
  },

  {
    id: 110,
    title: "Find Keys Within a Given Range",
    difficulty: "Medium",
    collection: "TreeMap<Integer, Integer>",
    tags: ["TreeMap", "subMap", "range query"],
    description: `<p>Given key-value pairs stored in a TreeMap, print all keys between two given values (inclusive).</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">5<br>10 100<br>20 200<br>30 300<br>40 400<br>50 500<br>25 45</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">30 -&gt; 300<br>40 -&gt; 400</span></div>
<div class="ex-explain">Keys 30 and 40 fall in range [25, 45]. TreeMap.subMap() is perfect for this.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 500</li>
  <li>Input: n, then n lines of "key value", then last line = "low high"</li>
  <li>TreeMap automatically maintains sorted order</li>
  <li>Use <code>map.subMap(low, true, high, true)</code></li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Use <code>TreeMap&lt;Integer, Integer&gt;</code> — it maintains sorted key order automatically.</li>
  <li><code>map.subMap(low, true, high, true)</code> returns a view of entries with keys in [low, high].</li>
  <li>Iterate over the entrySet of the subMap to print results.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int key = sc.nextInt();
            int value = sc.nextInt();
            map.put(key, value);
        }
        int low = sc.nextInt();
        int high = sc.nextInt();
        for (Map.Entry<Integer, Integer> entry :
                map.subMap(low, true, high, true).entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int key = sc.nextInt();
            int value = sc.nextInt();
            map.put(key, value);
        }
        int low = sc.nextInt();
        int high = sc.nextInt();
        // TODO: Use map.subMap(low, true, high, true) to get entries in range
        // TODO: Print each as "key -> value"
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n10 100\n20 200\n30 300\n40 400\n50 500\n25 45", expected: "30 -> 300\n40 -> 400",            description: "Keys 30 and 40 in [25,45]" },
      { input: "3\n5 50\n15 150\n25 250\n10 20",                   expected: "15 -> 150",                       description: "Only key 15 in [10,20]" },
      { input: "4\n1 10\n2 20\n3 30\n4 40\n2 3",                   expected: "2 -> 20\n3 -> 30",                description: "Keys 2 and 3 in [2,3]" },
      { input: "4\n10 1\n20 2\n30 3\n40 4\n50 60",                 expected: "",                                description: "Range beyond all keys — no output" },
      { input: "5\n1 10\n3 30\n5 50\n7 70\n9 90\n3 7",             expected: "3 -> 30\n5 -> 50\n7 -> 70",      description: "Three keys inside range [3,7]" },
      { input: "3\n100 1000\n200 2000\n300 3000\n100 300",          expected: "100 -> 1000\n200 -> 2000\n300 -> 3000", description: "Entire map falls in range" },
    ]
  },

  {
    id: 111,
    title: "Find Floor and Ceiling of a Number",
    difficulty: "Medium",
    collection: "TreeMap<Integer, String>",
    tags: ["TreeMap", "floorKey", "ceilingKey"],
    description: `<p>Given a set of keys stored in a TreeMap and a number x, find:</p>
<ul>
  <li><strong>Floor</strong>: greatest key less than or equal to x</li>
  <li><strong>Ceiling</strong>: smallest key greater than or equal to x</li>
</ul>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Keys:</span><span class="ex-val">10 20 30 40 50</span></div>
<div class="ex-line"><span class="ex-key">x = 26</span></div>
<div class="ex-line"><span class="ex-key">Floor:</span><span class="ex-val">20</span></div>
<div class="ex-line"><span class="ex-key">Ceiling:</span><span class="ex-val">30</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Input: n, then n integer keys, then x</li>
  <li>Print "Floor = X" and "Ceiling = X"</li>
  <li>Print "Floor does not exist" or "Ceiling does not exist" if applicable</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Insert keys into a <code>TreeMap</code>.</li>
  <li>Use <code>map.floorKey(x)</code> → returns largest key &le; x (null if none).</li>
  <li>Use <code>map.ceilingKey(x)</code> → returns smallest key &ge; x (null if none).</li>
  <li>Check for null before printing.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, String> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int key = sc.nextInt();
            map.put(key, "Value" + key);
        }
        int x = sc.nextInt();
        Integer floor = map.floorKey(x);
        Integer ceiling = map.ceilingKey(x);
        if (floor != null) {
            System.out.println("Floor = " + floor);
        } else {
            System.out.println("Floor does not exist");
        }
        if (ceiling != null) {
            System.out.println("Ceiling = " + ceiling);
        } else {
            System.out.println("Ceiling does not exist");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, String> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int key = sc.nextInt();
            map.put(key, "Value" + key);
        }
        int x = sc.nextInt();
        // TODO: Use map.floorKey(x) and map.ceilingKey(x)
        // TODO: Print "Floor = X" or "Floor does not exist"
        // TODO: Print "Ceiling = X" or "Ceiling does not exist"
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n10 20 30 40 50\n26",  expected: "Floor = 20\nCeiling = 30",              description: "26 is between 20 and 30" },
      { input: "5\n10 20 30 40 50\n30",  expected: "Floor = 30\nCeiling = 30",              description: "Exact match: floor and ceiling are same key" },
      { input: "3\n10 20 30\n5",         expected: "Floor does not exist\nCeiling = 10",    description: "x below all keys — no floor" },
      { input: "3\n10 20 30\n35",        expected: "Floor = 30\nCeiling does not exist",    description: "x above all keys — no ceiling" },
      { input: "4\n5 15 25 35\n15",      expected: "Floor = 15\nCeiling = 15",              description: "x is an exact key in the middle" },
      { input: "5\n2 4 6 8 10\n7",       expected: "Floor = 6\nCeiling = 8",               description: "x between 6 and 8" },
    ]
  },

  {
    id: 112,
    title: "Find the Closest Key to a Given Number",
    difficulty: "Medium",
    collection: "TreeMap<Integer, String>",
    tags: ["TreeMap", "floorKey", "ceilingKey", "closest"],
    description: `<p>Given sorted keys and a target number, find the key whose value is closest to the target.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Keys:</span><span class="ex-val">10 20 30 40 50</span></div>
<div class="ex-line"><span class="ex-key">Target:</span><span class="ex-val">26</span></div>
<div class="ex-line"><span class="ex-key">Closest:</span><span class="ex-val">30</span></div>
<div class="ex-explain">|26-20|=6, |26-30|=4 → 30 is closer. If tied, the floor (lower) key is preferred.</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>Input: n, then n integer keys, then target</li>
  <li>If tied distance, prefer the floor key (lower)</li>
  <li>Print "No key available" if the map is empty</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Get floor and ceiling using <code>floorKey(target)</code> and <code>ceilingKey(target)</code>.</li>
  <li>If only one exists, that's the answer.</li>
  <li>If both exist, compare <code>Math.abs(target - floor)</code> vs <code>Math.abs(ceiling - target)</code>.</li>
  <li>If equal distance, prefer the floor.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, String> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int key = sc.nextInt();
            map.put(key, "Value");
        }
        int target = sc.nextInt();
        Integer floor = map.floorKey(target);
        Integer ceiling = map.ceilingKey(target);
        Integer answer;
        if (floor == null) {
            answer = ceiling;
        } else if (ceiling == null) {
            answer = floor;
        } else {
            int floorDistance = Math.abs(target - floor);
            int ceilingDistance = Math.abs(ceiling - target);
            if (floorDistance <= ceilingDistance) {
                answer = floor;
            } else {
                answer = ceiling;
            }
        }
        if (answer != null) {
            System.out.println(answer);
        } else {
            System.out.println("No key available");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, String> map = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int key = sc.nextInt();
            map.put(key, "Value");
        }
        int target = sc.nextInt();
        Integer floor = map.floorKey(target);
        Integer ceiling = map.ceilingKey(target);
        Integer answer = null;
        // TODO: Determine the closest key to target using floor and ceiling
        // TODO: If tied distance, prefer floor
        if (answer != null) {
            System.out.println(answer);
        } else {
            System.out.println("No key available");
        }
        sc.close();
    }
}`,
    testCases: [
      { input: "5\n10 20 30 40 50\n26",  expected: "30", description: "|26-30|=4 < |26-20|=6, ceiling wins" },
      { input: "5\n10 20 30 40 50\n25",  expected: "20", description: "Tie: prefer floor (20) over ceiling (30)" },
      { input: "3\n10 20 30\n5",         expected: "10", description: "Only ceiling exists — must pick 10" },
      { input: "3\n10 20 30\n40",        expected: "30", description: "Only floor exists — must pick 30" },
      { input: "4\n1 5 9 13\n7",         expected: "5",  description: "|7-5|=2 < |7-9|=2 → tie, prefer floor 5" },
      { input: "5\n100 200 300 400 500\n350", expected: "300", description: "|350-300|=50 == |400-350|=50 → tie, prefer floor 300" },
    ]
  },

  {
    id: 113,
    title: "Count Number of Pairs with a Given Difference",
    difficulty: "Hard",
    collection: "HashMap<Integer, Integer>",
    tags: ["HashMap", "pairs", "frequency", "difference"],
    description: `<p>Given an array and an integer k, count the number of pairs (a, b) such that |a - b| = k.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">6<br>1 5 3 4 2 6<br>2</span></div>
<div class="ex-line"><span class="ex-key">Pairs:</span><span class="ex-val">(1,3), (3,5), (2,4), (4,6)</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">4</span></div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 10000</li>
  <li>Input: n, then n integers, then k</li>
  <li>Count ordered pairs: for each x, check x+k exists</li>
  <li>Use <code>long</code> for the count</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Store the frequency of each element in a HashMap.</li>
  <li>For each unique value x: check if x+k exists in the map.</li>
  <li>Add <code>freq(x) * freq(x+k)</code> to the count.</li>
  <li>Use <code>long count</code> since pairs can be large.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            frequency.put(value, frequency.getOrDefault(value, 0) + 1);
        }
        int k = sc.nextInt();
        long count = 0;
        for (Map.Entry<Integer, Integer> entry : frequency.entrySet()) {
            int value = entry.getKey();
            int freq = entry.getValue();
            count += (long) freq * frequency.getOrDefault(value + k, 0);
        }
        System.out.println(count);
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            // TODO: Update frequency map
        }
        int k = sc.nextInt();
        long count = 0;
        // TODO: For each entry, check if value+k exists and add freq(x) * freq(x+k) to count
        System.out.println(count);
        sc.close();
    }
}`,
    testCases: [
      { input: "6\n1 5 3 4 2 6\n2",        expected: "4",  description: "4 pairs with difference exactly 2" },
      { input: "4\n1 2 3 4\n0",             expected: "0",  description: "k=0, no repeated values so no pairs" },
      { input: "5\n1 1 2 2 3\n1",           expected: "4",  description: "freq(1)=2, freq(2)=2 → 2×2=4 pairs" },
      { input: "5\n5 5 5 10 10\n5",         expected: "6",  description: "freq(5)=3, freq(10)=2 → 3×2=6 pairs" },
      { input: "6\n1 2 3 4 5 6\n3",         expected: "3",  description: "Pairs: (1,4),(2,5),(3,6)" },
      { input: "4\n10 20 30 40\n100",        expected: "0",  description: "No element differs by 100" },
    ]
  },

  {
    id: 114,
    title: "Find the Top K Frequent Elements",
    difficulty: "Hard",
    collection: "HashMap + PriorityQueue",
    tags: ["HashMap", "PriorityQueue", "min-heap", "top-k"],
    description: `<p>Given an array and an integer k, find the k elements having the highest frequencies. Print them in descending order of frequency. Tie-break by smaller value first.</p>

<h3>Example</h3>
<div class="example-block">
<div class="ex-label">Example</div>
<div class="ex-line"><span class="ex-key">Input:</span><span class="ex-val">8<br>1 1 1 2 2 3 3 4<br>2</span></div>
<div class="ex-line"><span class="ex-key">Frequencies:</span><span class="ex-val">1→3, 2→2, 3→2, 4→1</span></div>
<div class="ex-line"><span class="ex-key">Output:</span><span class="ex-val">1 2</span></div>
<div class="ex-explain">Top 2 most frequent: 1 (freq 3) and 2 (freq 2, smaller than 3).</div>
</div>

<div class="constraints-box">
<h3>Constraints</h3>
<ul>
  <li>1 &le; n &le; 10000, 1 &le; k &le; distinct elements count</li>
  <li>Input: n, then n integers, then k</li>
  <li>Use a min-heap (PriorityQueue) of size k for efficiency</li>
  <li>Tie-break: smaller value first</li>
</ul>
</div>`,
    hint: `<h3>Hint</h3>
<ol>
  <li>Build a frequency HashMap.</li>
  <li>Use a min-heap <code>PriorityQueue</code> ordered by frequency ascending.</li>
  <li>Push each unique element; if heap size exceeds k, remove the min.</li>
  <li>Collect the heap into a list, sort by freq desc then value asc, and print.</li>
</ol>`,
    solution: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            frequency.put(value, frequency.getOrDefault(value, 0) + 1);
        }
        int k = sc.nextInt();
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(
            (a, b) -> Integer.compare(frequency.get(a), frequency.get(b))
        );
        for (int value : frequency.keySet()) {
            minHeap.offer(value);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        ArrayList<Integer> result = new ArrayList<>(minHeap);
        result.sort((a, b) -> {
            int frequencyCompare = Integer.compare(frequency.get(b), frequency.get(a));
            if (frequencyCompare != 0) {
                return frequencyCompare;
            }
            return Integer.compare(a, b);
        });
        for (int value : result) {
            System.out.print(value + " ");
        }
        sc.close();
    }
}`,
    starterCode: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashMap<Integer, Integer> frequency = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            // TODO: Update frequency map
        }
        int k = sc.nextInt();
        // TODO: Use a min-heap PriorityQueue ordered by frequency
        // TODO: Keep heap size <= k by polling when it exceeds k
        // TODO: Collect, sort (freq desc, value asc), and print
        sc.close();
    }
}`,
    testCases: [
      { input: "8\n1 1 1 2 2 3 3 4\n2",     expected: "1 2 ", description: "Top 2: 1 (freq 3), 2 (freq 2, ties at 2 vs 3)" },
      { input: "5\n1 2 3 4 5\n3",            expected: "1 2 3 ", description: "All freq 1, top 3 smallest values" },
      { input: "6\n3 3 3 2 2 1\n1",          expected: "3 ",  description: "Only the most frequent element" },
      { input: "9\n4 4 4 4 2 2 2 1 1\n2",    expected: "4 2 ", description: "Top 2: 4 (freq 4), 2 (freq 3)" },
      { input: "7\n5 5 6 6 7 7 8\n2",        expected: "5 6 ", description: "3 elements tied at freq 2; pick top 2 by value" },
      { input: "10\n1 1 2 2 3 3 4 4 5 5\n4", expected: "1 2 3 4 ", description: "All freq 2, top 4 by value" },
    ]
  },
];
