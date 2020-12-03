package i3a.asn.Models;

import java.sql.Date;
import java.sql.Timestamp;

public class LogEintrag {
    private int id;
    private int userId;
    private String vistedPage;
    private Timestamp activityTime;

    public LogEintrag(int id, int userId, String vistedPage, Timestamp activityTime) {
        this.id = id;
        this.userId = userId;
        this.vistedPage = vistedPage;
        this.activityTime = activityTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getVistedPage() {
        return vistedPage;
    }

    public void setVistedPage(String vistedPage) {
        this.vistedPage = vistedPage;
    }

    public Timestamp getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(Timestamp activityTime) {
        this.activityTime = activityTime;
    }
}
