import java.util.*;

public class Try{
    public static void main(String[] a){
        System.out.println("ko");
        BitSet b=new BitSet(500);
        b.set(5);
        b.set(43);
        b.flip(42);
        System.out.println(b);
        System.out.println(b.cardinality());
        System.out.println(b.get(78));
    }
}