package i3a.asn.Models.Admin;

/**
 * 
 * @author 1810g, Andrei Oleniuc
 */

public class AddUser {
    private int id;
    private int add;

    public AddUser(int id, int add) {
        this.id = id;
        this.add = add;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAdd() {
        return add;
    }

    public void setAdd(int add) {
        this.add = add;
    }
}
