import java.util.*;

public class Try{
    public static void main(String[] a){
        HashMap<Integer,Integer> map=new HashMap<>();
        Scanner sc=new Scanner(System.in);
        for(int i=0;i<14;i++){
            map.put(i,0);
        }
        while(1>0){
            System.out.println("Enter : ");
            int n=sc.nextInt();
            map.put(n, map.get(n)+1);
            int c_above_7=0;
            int c_below_7=0;
            for(Map.Entry<Integer,Integer> entry:map.entrySet()){
                if(entry.getKey()>=7)c_above_7 +=entry.getValue();
                else c_below_7 +=entry.getValue();
            }
            System.out.println("Below 7: "+c_below_7+" Above 7: "+c_above_7);
        }
    }
}