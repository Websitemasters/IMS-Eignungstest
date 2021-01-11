package i3a.asn.Models.Admin;

import java.util.Date;
import java.sql.Timestamp;

/**
 * Log Eintrag Modelklasse
 * @author 1810g, Andrei Oleniuc
 */
public class LogEintrag {
    private int id;
    private int userId;
    private String vistedPage;
    private String activityTime;

    public LogEintrag(int id, int userId, String vistedPage, String activityTime) {
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

    public String getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(String activityTime) {
        this.activityTime = activityTime;
    }
}