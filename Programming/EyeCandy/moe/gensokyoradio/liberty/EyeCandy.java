package moe.gensokyoradio.liberty;

import javax.swing.JOptionPane;
import java.awt.TrayIcon;
import java.awt.SystemTray;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.AWTException;
import java.awt.Toolkit;
import java.awt.Image;
import java.awt.Canvas;

public class EyeCandy {
    public static void main(String[] args) {
        long workDuration = 20 * 60 * 1000;
        long restDuration = 20;
        if(args.length == 1) {
            if(args[0].equals("-h") || args[0].equals("--help")) {
                System.out.println("Usage: java EyeCandy [work duration in secconds [rest duration in seconds]]");
                System.exit(0);
                return;
            }
            else {
                try {
                    workDuration = Long.parseLong(args[0]);
                } catch(NumberFormatException e) {
                    System.err.println("Please enter proper numbers. `java EyeCandy --help` for help.");
                    System.exit(-1);
                    return;
                }
            }
        } else if(args.length == 2) {
            try {
                workDuration = Long.parseLong(args[0]);
                restDuration = Long.parseLong(args[1]);
            } catch(NumberFormatException e) {
                System.err.println("Please enter proper numbers. `java EyeCandy --help` for help.");
                System.exit(-1);
                return;
            }
        }
        EyeCandy eyeCandy = new EyeCandy(workDuration, restDuration);
        eyeCandy.start();
    }

    private long workDuration;
    private long restDuration;
    private boolean workSkipped = false;
    TrayIcon icon = null;
    public EyeCandy(long workDuration, long restDuration) {
        this.workDuration = workDuration;
        this.restDuration = restDuration;
        this.initializeSystemTray();
    }
    private void initializeSystemTray() {
        if (SystemTray.isSupported()) {
            SystemTray tray = SystemTray.getSystemTray();
            Image image = Toolkit.getDefaultToolkit().getImage("moe/gensokyoradio/liberty/icon.png");
            this.icon = new TrayIcon(image, "Loading");
            this.icon.setImageAutoSize(true);
            this.icon.addMouseListener(new MouseListener(){
                @Override
                public void mouseReleased(MouseEvent e) {}
                @Override
                public void mousePressed(MouseEvent e) {}
                @Override
                public void mouseExited(MouseEvent e) {}
                @Override
                public void mouseEntered(MouseEvent e) {}
                @Override
                public void mouseClicked(MouseEvent e) {
                    if(JOptionPane.showConfirmDialog(null, "Skip the work and go for a rest?", "Rest?", JOptionPane.YES_NO_CANCEL_OPTION) == JOptionPane.YES_OPTION) {
                        workSkipped = true;
                    }
                }
            });
            try {
                tray.add(this.icon);
            } catch (AWTException e) {
                System.err.println(e);
            }
        } else {
            this.icon = null;
        }
    }
    public void start() {
        while(true) {
            for(int i = 0; i != this.workDuration; ++i) {
                this.sleepASecond();
                if(this.icon != null) {
                    this.icon.setToolTip("Worked for " + (i / 60) + " min " + (i % 60) + " sec.\n");
                    if(i % (5 * 60) == 0) {
                        this.icon.displayMessage("Reminder", "Worked for " + (i / 60) + " min.", TrayIcon.MessageType.WARNING);
                    }
                }
                if(this.workSkipped) {
                    this.workSkipped = false;
                    break;
                }
            }
            remind();
        }
    }
    private void remind() {
        JOptionPane.showMessageDialog(null, "Please go for a rest!", "Reminder", JOptionPane.WARNING_MESSAGE);
        while(true) {
            try {
                Thread.sleep(this.restDuration * 1000);
            } catch(InterruptedException e) {
                System.err.println("This is the only thread and should never be interrupted.");
                e.printStackTrace();
            }
            if(JOptionPane.showConfirmDialog(null, "Have you gone for a rest?", "Rest?", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
                if(this.icon != null) {
                    this.icon.displayMessage("Reminder", "Good job!", TrayIcon.MessageType.NONE);
                }
                break;
            } else {
                JOptionPane.showMessageDialog(null, "Then go for it!", "PLEASE DO", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
    private void sleepASecond() {
        try {
            Thread.sleep(1000);
        } catch(InterruptedException e) {
            System.err.println("This is the only thread and should never be interrupted.");
            e.printStackTrace();
        }
    }
}
