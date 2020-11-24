package i3a.granoa.kasseprojekt;

import java.io.FileWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.input.MouseEvent;
import javafx.util.Callback;
import javax.swing.JOptionPane;
import javax.swing.JTextField;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class FXMLController implements Initializable {

	@FXML
	private Label label;
	@FXML
	private ListView<Item> itemLV;
	@FXML
	private Button addItems;
	@FXML
	private Button btnBezahlen;

	private List<Item> allItemsList = new ArrayList();
	private Bestellung bestellung;
	ObservableList<Item> oList;

	@Override
	public void initialize(URL url, ResourceBundle rb) {
		bestellung = Bestellung.getInstance();
		try {
			Document doc = new SAXBuilder().build("src/main/java/i3a/granoa/kasseprojekt/AllItems.xml");
			Element items = doc.getRootElement();
			List list = items.getChildren("Ware");
			for (int i = 0; i < list.size(); i++) {
				Element node = (Element) list.get(i);
				String name = node.getChildText("name");
				String preis = node.getChildText("preis");
				allItemsList.add(new Item(name, preis));

			}
		}
		catch (Exception ex) {
			System.out.println(ex.getLocalizedMessage());
		}
		oList = FXCollections.observableArrayList(allItemsList);
		itemLV.setCellFactory(new Callback<ListView<Item>, ListCell<Item>>() {

			@Override
			public ListCell<Item> call(ListView<Item> param) {
				ListCell<Item> cell = new ListCell<Item>() {

					@Override
					protected void updateItem(Item item, boolean empty) {
						super.updateItem(item, empty);
						if (item != null) {
							setText("Name: " + item.getName() + " Preis: " + item.getPreis() + " CHF");
						}
					}
				};
				return cell;
			}
		});
		itemLV.setOnMouseClicked(new EventHandler<MouseEvent>() {

			@Override
			public void handle(MouseEvent event) {
				String anzeige = "Wieviele von: " + itemLV.getSelectionModel().getSelectedItem().getName();
				String eingabe = JOptionPane.showInputDialog(null, anzeige,
					"Menge",
					JOptionPane.PLAIN_MESSAGE);
				System.out.println("Menge: " + eingabe);
				for (int i = 0; i < Integer.parseInt(eingabe); i++) {
					bestellung.addItem(itemLV.getSelectionModel().getSelectedItem());
				}

			}
		});
		itemLV.setItems(oList);

	}

	@FXML
	private void addClicked(ActionEvent event) {
		JTextField name = new JTextField();
		JTextField preis = new JTextField();
		Object[] message = {"Name", name,
			"Preis", preis};

		JOptionPane pane = new JOptionPane(message,
			JOptionPane.PLAIN_MESSAGE,
			JOptionPane.OK_CANCEL_OPTION);
		pane.createDialog(null, "Hinzufügen").setVisible(true);

		System.out.println("Item hinzugefügt");
		oList.add(new Item(name.getText(), preis.getText()));
		itemLV.refresh();
		Document doc;
		try {
			doc = new SAXBuilder().build("src/main/java/i3a/granoa/kasseprojekt/AllItems.xml");
			Element items = doc.getRootElement();
			Element newItem = new Element("Ware");
			Element elPreis = new Element("preis");
			Element elName = new Element("name");
			elPreis.setText(preis.getText());
			elName.setText(name.getText());
			newItem.addContent(elPreis);
			newItem.addContent(elName);
			Element root = doc.getRootElement().clone();
			root.detach();	
			root.addContent(newItem);
//			items.addContent(newItem);
			Document doc1 = new Document(root);
			XMLOutputter xmlOutput = new XMLOutputter();
			xmlOutput.setFormat(Format.getPrettyFormat());
			xmlOutput.output(doc1, new FileWriter("src/main/java/i3a/granoa/kasseprojekt/AllItems.xml"));

		}
		catch (Exception ex) {
			Logger.getLogger(FXMLController.class.getName()).log(Level.SEVERE, null, ex);
		}

	}

	@FXML
	private void bezahlenClicked(ActionEvent event) {
		String anzeige = "Totaler preis: " + bestellung.getTotalPreis();
		String eingabe = JOptionPane.showInputDialog(null, anzeige,
			"Bezahlen",
			JOptionPane.PLAIN_MESSAGE);
		Double bezahlt = Double.parseDouble(eingabe);
		if (bezahlt < bestellung.getTotalPreis()) {
			System.out.println("Zu wenig!");
		}
		else {
			bezahlt -= bestellung.getTotalPreis();
		}
		System.out.println("Rückgeld: " + bezahlt);

	}
}
