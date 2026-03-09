import java.util.*;

/* ======CO2: ADT - Menu Item======  */
class MenuItem {
    String name;
    double price;
    String desc;
    String category;

    MenuItem(String name, double price, String desc, String category) {
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.category = category;
    }

    public String toString() {
        return name + " - ₹" + price + " | " + desc + " [" + category + "]";
    }
}

/*===== CO3: Queue - Order ==== */
class Order {
    int id;
    String customerName;
    int tableNumber;
    List<MenuItem> items;
    String status;
    String time;

    Order(int id, String customerName, int tableNumber, List<MenuItem> items) {
        this.id = id;
        this.customerName = customerName;
        this.tableNumber = tableNumber;
        this.items = items;
        this.status = "Pending";
        this.time = new Date().toString();
    }

    double calculateTotal() {
        double total = 0;
        for (MenuItem item : items)
            total += item.price;
        return total;
    }

    public String toString() {
        return "\nOrder ID: " + id +
                "\nCustomer: " + customerName +
                "\nTable: " + tableNumber +
                "\nTime: " + time +
                "\nStatus: " + status +
                "\nTotal: ₹" + calculateTotal();
    }
}

/* ================= MAIN SYSTEM ================= */
public class CoffeeHeavenSystem {

    /* CO2: ArrayList (Dynamic Menu Storage) */
    static ArrayList<MenuItem> menu = new ArrayList<>();

    /* CO3: Queue (FIFO Order Processing) */
    static Queue<Order> orderQueue = new LinkedList<>();

    /* CO4: HashMap (Fast Table Lookup) */
    static HashMap<Integer, Order> activeOrders = new HashMap<>();

    /* CO4: HashMap (Fast Menu Search) */
    static HashMap<String, MenuItem> menuMap = new HashMap<>();

    static int orderId = 1;

    public static void main(String[] args) {

        /* ================= MENU DATA ================= */

        // ☕ COFFEE
        menu.add(new MenuItem("Black Coffee", 120, "Strong black coffee", "Coffee"));
        menu.add(new MenuItem("Hot Coffee", 150, "Milk coffee", "Coffee"));
        menu.add(new MenuItem("Dark Coffee", 180, "Dark roast coffee", "Coffee"));

        // 🍔 FOOD
        menu.add(new MenuItem("Pizza", 299, "Cheesy pizza", "Food"));
        menu.add(new MenuItem("Burger", 149, "Veg burger", "Food"));
        menu.add(new MenuItem("French Fries", 99, "Crispy fries", "Food"));

        // 🍨 DESSERTS
        menu.add(new MenuItem("Vanilla Ice Cream", 99, "Vanilla flavour", "Dessert"));
        menu.add(new MenuItem("Chocolate Ice Cream", 119, "Chocolate flavour", "Dessert"));
        menu.add(new MenuItem("Belgian Waffle", 149, "Chocolate waffle", "Dessert"));

        /* CO4: Build HashMap for Fast Menu Lookup */
        buildMenuMap();

        Scanner sc = new Scanner(System.in);

        System.out.println("☕ Welcome to Coffee Heaven");
        displayMenu();

        System.out.print("\nEnter Customer Name: ");
        String name = sc.nextLine();

        System.out.print("Enter Table Number: ");
        int table = sc.nextInt();

        List<MenuItem> cart = new ArrayList<>();

        System.out.print("How many items do you want to order? ");
        int n = sc.nextInt();

        for (int i = 0; i < n; i++) {
            System.out.print("Enter item number: ");
            int choice = sc.nextInt();
            cart.add(menu.get(choice - 1));
        }

        placeOrder(name, table, cart);
        processOrders();

        /* Example CO4 Fast Search */
        sc.nextLine();
        System.out.print("\nSearch Menu Item: ");
        String search = sc.nextLine();

        MenuItem found = searchItemFast(search);
        if (found != null)
            System.out.println("Item Found: " + found);
        else
            System.out.println("Item not found");

        sc.close();
    }

    /* ================= CO1: Linear Search ================= */
    static MenuItem searchItem(String itemName) {
        for (MenuItem item : menu) {
            if (item.name.equalsIgnoreCase(itemName))
                return item;
        }
        return null;
    }

    /* ================= CO4: HashMap Fast Search ================= */
    static MenuItem searchItemFast(String itemName) {
        return menuMap.get(itemName.toLowerCase());
    }

    /* ================= CO4: Build HashMap ================= */
    static void buildMenuMap() {
        for (MenuItem item : menu) {
            menuMap.put(item.name.toLowerCase(), item);
        }
    }

    /* ================= CO1: Bubble Sort ================= */
    static void sortMenuByPrice() {
        for (int i = 0; i < menu.size() - 1; i++) {
            for (int j = 0; j < menu.size() - i - 1; j++) {
                if (menu.get(j).price > menu.get(j + 1).price) {
                    MenuItem temp = menu.get(j);
                    menu.set(j, menu.get(j + 1));
                    menu.set(j + 1, temp);
                }
            }
        }
    }

    static void displayMenu() {
        sortMenuByPrice();
        System.out.println("\n📋 MENU (Sorted by Price)");
        for (int i = 0; i < menu.size(); i++) {
            System.out.println((i + 1) + ". " + menu.get(i));
        }
    }

    /* ================= PLACE ORDER ================= */
    static void placeOrder(String name, int table, List<MenuItem> items) {

        Order order = new Order(orderId++, name, table, items);

        orderQueue.add(order);           // Queue
        activeOrders.put(table, order);  // HashMap

        System.out.println("\n✅ Order placed successfully!");
    }

    /* ================= PROCESS ORDERS ================= */
    static void processOrders() {

        while (!orderQueue.isEmpty()) {

            Order order = orderQueue.poll();  // FIFO
            order.status = "Served";

            System.out.println("\n🚀 Processing Order...");
            System.out.println(order);
        }
    }
}