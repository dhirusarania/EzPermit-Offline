package com.hanum.ezpermit.ezpermitoffile;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.regex.Pattern;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DownloadManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.media.MediaMetadataRetriever;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.PowerManager;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.view.ViewPager;
import android.app.AlertDialog;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.JsonReader;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import de.ailis.pherialize.MixedArray;
import de.ailis.pherialize.Pherialize;

import static java.util.Objects.isNull;

/**
 * The <code>ViewPagerFragmentActivity11111111</code> class is the fragment activity hosting the ViewPager
 * @author mwho
 */
public class MainActivity extends FragmentActivity {
    /* (non-Javadoc)
     * @see android.support.v4.app.FragmentActivity#onCreate(android.os.Bundle)
     */

    private static final String TAG = MainActivity.class.getSimpleName();
    private String mCM;
    private ValueCallback<Uri> mUM;
    private ValueCallback<Uri[]> mUMA;
    private final static int FCR=1;


    /*
     *
     * These values will come from Shared Preferences
     *
     */


//    public int session = -37;
//    public int project = -37;
//    public int currentUser = -37;

    public static int projectid;

    public static int serviceaccount;

    public static int currentUserid;


    public String foldername;

    public static JSONArray allfileList;

    public JSONObject canvasData = new JSONObject();
    public JSONArray layersList = new JSONArray();

    public JSONObject finalJ = new JSONObject();
    public JSONObject student1 = new JSONObject();

    public JSONArray jsonArray = new JSONArray();

    public int CAPTURE_MODE = 0;


    public int downloadedFileCount = 0;

    public int totalFileCount = 0;

    public JSONArray downloadResponse1 = new JSONArray();

    public static final int REQUEST_VIDEO_CAPTURE = 1;


    static WebView webView;

    private static MainActivity instance;


    private boolean multiple_files = false;

    public static ViewPager pager;

    public DownloadTask downloadTask;



    ProgressDialog mProgressDialog;



    private String getRealPathFromURI(Uri contentURI) {
        String result;
        Cursor cursor = getContentResolver().query(contentURI, null, null, null, null);
        if (cursor == null) { // Source is Dropbox or other similar local file path
            result = contentURI.getPath();
        } else {
            cursor.moveToFirst();
            int idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
            result = cursor.getString(idx);
            cursor.close();
        }
        return result;
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);


        Uri[] results = null;

        Uri videoUri = null;


        if (requestCode == REQUEST_VIDEO_CAPTURE && resultCode == RESULT_OK && CAPTURE_MODE == 2) {
            videoUri = intent.getData();
//            path = getRealPathFromURI(videoUri);
            Log.d("Videohaha11", String.valueOf(getRealPathFromURI(videoUri)));

        }

        if(CAPTURE_MODE == 2){
            videoUri = intent.getData();
            Log.d("Videohaha11", String.valueOf(videoUri));


            Bitmap bbicon;

            try {
                bbicon = retriveVideoFrameFromVideo(String.valueOf(getRealPathFromURI(videoUri)));

                File sdCard = Environment.getExternalStorageDirectory();
                String path = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/";
                OutputStream fOut = null;
                File file = new File(path, "thuba.jpg");
                fOut = new FileOutputStream(file);

                bbicon.compress(Bitmap.CompressFormat.JPEG, 85, fOut);
                fOut.flush();
                fOut.close();

                MediaStore.Images.Media.insertImage(getContentResolver()
                        ,file.getAbsolutePath(),file.getName(),file.getName());

            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }

            final Uri finalVideoUri = videoUri;
            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:sendVideo('"+ String.valueOf(getRealPathFromURI(finalVideoUri)) +"' , 1, 66565)"); //if passing in an object. Mapping may need to take place
                }
            });

        }else if (Build.VERSION.SDK_INT >= 21) {

                Log.d("log", "this" + resultCode);
                //checking if response is positive
                if (resultCode == Activity.RESULT_OK) {
                    if (requestCode == FCR) {
                        if (null == mUMA) {
                            return;
                        }
                        if (intent == null || intent.getData() == null) {
                            if (mCM != null) {

                               if(CAPTURE_MODE == 2){

                                   Log.d("Videohaha1122", String.valueOf(getRealPathFromURI(videoUri)));

                                   mCM = "file:" + String.valueOf(getRealPathFromURI(videoUri));

                                }


                                Log.e("eerer", "sss-ha" + mCM);

//                                moveFile(mCM, "/storage/emulated/0/Download");

                                results = new Uri[]{Uri.parse(mCM)};

                                Log.e("eerer", "sss-ha" + results);
                            }
                        }
                    }
                }
                mUMA.onReceiveValue(results);
                mUMA = null;
            } else {
                if (requestCode == FCR) {
                    if (null == mUM) return;
                    Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
                    mUM.onReceiveValue(result);
                    mUM = null;
                }
            }
//        }

    }


    static Activity activity;
    public MainActivity(){
        this.activity = activity;
        downloadTask = null;
    }


    public class WebAppInterface {
        Context mContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void getAllAccounts() {

            File sdCard = Environment.getExternalStorageDirectory();
            String path = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/downloads/";

            final JSONArray allAccounts = new JSONArray();


            File f = new File(path);
            File[] files = f.listFiles();
            for (File inFile : files) {
                if (inFile.isDirectory()) {
                    // is directory
                    allAccounts.put(inFile.getName());


                }
            }




            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl("javascript:getAllAccounts("+ allAccounts +")"); //if passing in an object. Mapping may need to take place
                }
            });


        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void saveLayer(String response , String Name, String path , String activeLayer) {


            Log.e("checkifFileExist" , response);
            Log.e("checkifFileExist" , Name);
            Log.e("checkifFileExist" ,path);


            createLayerFile(response , path , activeLayer);


        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void changeSession(String serviceID , String projectID, String test) {


            Log.e("checkifFileExist" , String.valueOf(serviceID));
            Log.e("checkifFileExist" , String.valueOf(projectID));
            Log.e("checkifFileExist" , test);


            SharedPreferences.Editor editor = getSharedPreferences("USER_DATA", MODE_PRIVATE).edit();
            editor.putInt("projectid", Integer.parseInt(projectID));
            editor.putInt("service_account", Integer.parseInt(serviceID));
            editor.apply();





            showToast("goOffline");

        }


        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String response) {

            Log.e("checkifFileExist" , response);


            if(response.equals("goOnline")){

                if(!isNetworkAvailable()){

                    Toast.makeText(MainActivity.this, "This is my Toast message!",
                            Toast.LENGTH_LONG).show();

                }else{

                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("https://www.easypermit.net/#/app/ViewProjectDetails");
                        }
                    });



                }




            }else if(response.equals("getData")){

                Log.e("zzz", "getData");

                File sdCard = Environment.getExternalStorageDirectory();
                String path = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/calendar/main.json";


                String singleLayerData = readFile(path);

                singleLayerData = convertJSONString(singleLayerData);

                singleLayerData = trimDoubleQuotes(singleLayerData);


                Log.e("zzz", singleLayerData);


                final String finalSingleLayerData = singleLayerData;

                webView.post(new Runnable() {
                    @Override
                    public void run() {
                        webView.loadUrl("javascript:calendar1(" + finalSingleLayerData + " , " + serviceaccount + " , " + projectid + ")"); //if passing in an object. Mapping may need to take place
                    }
                });



            }else if(response.equals("data")){


                Log.e("checkDataonStorage" ,"sdsds");


                boolean isNotFound = false;


//                for(int i = 0; i < allfileList.length(); i++) {
//
//
//                    try {
//                        Log.d("Files", "Path: " + allfileList.get(i));
//                    } catch (JSONException e) {
//                        e.printStackTrace();
//                    }
//
//                    File f = null;
//                    try {
//
//                        String replacedStr = String.valueOf(allfileList.get(i)).replace("https://easypermit.net/storage/" + serviceaccount + "/Common/" + projectid + "/drw(progress)", "");
//
//                        File sdCard = Environment.getExternalStorageDirectory();
//                        String path = sdCard.getAbsolutePath() + "/Android/data/com.hanum.ezpermit.ezpermitoffile/files" + replacedStr;
//
//
//                        f = new File(path);
//
//                        Log.d("Files", "Path: " + path);
//                        Log.d("Files", "Path: " + allfileList.get(i));
//
//
//                        if (!f.exists()) {
//
//                            isNotFound = true;
//
//                            break;
//
//                        }
//
//                    } catch (JSONException e) {
//                        e.printStackTrace();
//                    }
//
//
//                }

                SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

                projectid = prefs.getInt("projectid", -37);

                serviceaccount =prefs.getInt("service_account", -37);

                currentUserid =prefs.getInt("current_User", -37);

                String path = Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/calendar/main.json";
                Log.d("Files", "Path: " + path);
                File f = new File(path);

                if (!f.exists()) {

                    isNotFound = true;

                }


                if(!isNotFound){


                    Log.e("checkDataonStorageDatk" ,"!null");


                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("javascript:checkDataonStorage('not_empty')");
                        }
                    });

                }else{

                    Log.e("checkDataonStorageDatk" ,"nullll");


                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("javascript:checkDataonStorage('empty')");
                        }
                    });

                }




            }else if(response.equals("goOffline")){


                SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

                projectid = prefs.getInt("projectid", -37);

                serviceaccount =prefs.getInt("service_account", -37);

                currentUserid =prefs.getInt("current_User", -37);




                Log.e("checkDataonStorage" ,"sdsds");


                String path1 = Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/calendar/main.json";
                Log.d("Files", "Path: " + path1);
                File f = new File(path1);

                if(f.exists()){


                    Log.e("checkDataonStorage" ,"!null");


                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("javascript:checkDataonStorage('not_empty')");
                        }
                    });



                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("file:///android_asset/drawing2/calendar.html");
                        }
                    });


                    File sdCard = Environment.getExternalStorageDirectory();
                    String path = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/calendar/main.json";


                    String singleLayerData = readFile(path);

                    singleLayerData = convertJSONString(singleLayerData);

                    singleLayerData = trimDoubleQuotes(singleLayerData);


                    Log.e("zzz", singleLayerData);


                    final String finalSingleLayerData = singleLayerData;

                                    webView.post(new Runnable() {
                    @Override
                    public void run() {
                        webView.setWebViewClient(new WebViewClient(){
                            public void onPageFinished(WebView view, String url){
                                //Here you want to use .loadUrl again
                                //on the webView object and pass in
                                //"javascript:<your javaScript function"


                                view.loadUrl("javascript:calendar1(" + finalSingleLayerData + " , " + serviceaccount + " , " + projectid + ")"); //if passing in an object. Mapping may need to take place
                            }
                        });
                    }
                });

//                    webView.post(new Runnable() {
//                        @Override
//                        public void run() {
//                            webView.loadUrl("javascript:calendar1(" + finalSingleLayerData + ")"); //if passing in an object. Mapping may need to take place
//                        }
//                    });


                }else {

                    Log.e("checkDataonStorage", "nullll");


                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("javascript:checkDataonStorage('empty')");
                        }
                    });



                }


            }else if(response.equals("clearFiles")){



                deleteDir(new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/"));

                downloadHandler clearfiles = new downloadHandler();
                clearfiles.clearFiles(projectid, serviceaccount, currentUserid);



                webView.post(new Runnable() {
                    @Override
                    public void run() {
                        webView.loadUrl("https://www.easypermit.net/#/app/ViewProjectDetails");
                    }
                });


            }else if(response.equals("updateFiles")){




                uploadToServer uploadToServer = new uploadToServer();
                uploadToServer.execute();


            }else if(response.equals("downloadFiles")){




                SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

                projectid = prefs.getInt("projectid", -37);

                serviceaccount =prefs.getInt("service_account", -37);

                currentUserid =prefs.getInt("current_User", -37);

                Log.d("checkifFileExist" , "checkifFileExist-pageNumber/" + projectid + "/" + serviceaccount + "/" + currentUserid);


                int downloadResponse = sendAndRequestResponse(projectid, serviceaccount, currentUserid);


                downloadHandler downloadHandler1 = new downloadHandler();

                JSONArray downloadResponse1 = downloadHandler1.sendAndRequestResponse1(projectid, serviceaccount, currentUserid);


                downloadHandler downloadHandler2 = new downloadHandler();

                JSONArray downloadResponse2 = downloadHandler2.getUserData(projectid, serviceaccount, currentUserid);






            }else if(response.equals("downloadCalendar")){




                SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

                int projectid = prefs.getInt("projectid", -37);

                int serviceaccount =prefs.getInt("service_account", -37);

                int currentUserid =prefs.getInt("current_User", -37);

                Log.d("checkifFileExist" , "checkifFileExist-pageNumber/" + projectid + "/" + serviceaccount + "/" + currentUserid);


                downloadHandler downloadHandler = new downloadHandler();

                JSONArray downloadResponse = downloadHandler.sendAndRequestResponse1(projectid, serviceaccount, currentUserid);






            }

        }


        /** Show a toast from the web page */
        @JavascriptInterface
        public void checkifFileExistFunction(String response, String arg_filename , String arg_o_filename) {

            if(response.equals("checkifFileExist")){

                Log.d("checkifFileExist" , "checkifFileExist");

                checkifFileExist(arg_filename, arg_o_filename);


            }

        }


        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToastonProject(String response, int projectID, int service_account, int current_User) {

            if(response.equals("user_data")){

                            Log.d("checkifFileExist" , "checkifFileExist" + projectID);
                            Log.d("checkifFileExist" , "checkifFileExist" + service_account);
                            Log.d("checkifFileExist" , "checkifFileExist" + current_User);

                            SharedPreferences.Editor editor = getSharedPreferences("USER_DATA", MODE_PRIVATE).edit();
                            editor.putInt("projectid", projectID);
                            editor.putInt("service_account", service_account);
                            editor.putInt("current_User", current_User);
                            editor.apply();





            }





            Toast.makeText(MainActivity.this, "This is my Toast message!",
                    Toast.LENGTH_LONG).show();

        Log.i("Path", " <essgaasda.,sda");



        }
    }

    public static boolean deleteDir(File dir) {
        Log.d("deleted" , "tjhis" + dir.isDirectory());
        if (dir.isDirectory()) {
            String[] children = dir.list();

            Log.d("deleted" , "tjhis" + children);

            for (int i=0; i<children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }

        // The directory is now empty so delete it
        return dir.delete();
    }

    void deleteRecursive(File fileOrDirectory) {


        Log.d("deleted" , "tjhis");

        if (fileOrDirectory.isDirectory()) {
            for (File child : fileOrDirectory.listFiles())
                deleteRecursive(child);
                Log.d("deleted" , "tjhis" + Arrays.toString(fileOrDirectory.listFiles()));
        }

        fileOrDirectory.delete();

    }

    private void createLayerFile(String response ,String path, String activeLayer) {

//        Log.e("convert-normal" , response);
//
//        response = convertJSONString(response);
//
//        Log.e("convert-convertJSONt" , response);
//
//        response = trimDoubleQuotes(response);
//
//
//        Log.e("convert-dtri" , response);


//        JSONObject jsonObject = null;
//        try {
//            jsonObject = new JSONObject(response);
//            String path = jsonObject.getString("path");
//
//            Log.e("convert" , path);
//
//        } catch (JSONException e) {
//
//            e.printStackTrace();
//        }

        //getting specific key values


        foldername = path;
        int pos = foldername.lastIndexOf(".");
        if (pos > 0) {
            foldername = foldername.substring(0, pos);
            Log.d("Files", "FileName:1" + foldername);
        }

        String filename = foldername.replace("file:////storage/emulated/0/Android/data/com.hanum.ezpermit.ezpermitoffile/files/", "");

        Log.d("Files", "new filenames" + foldername);

        String ext = getExt(path);

        Log.d("Files", "new filenames" + ext);


        Log.d("Files", "new filenames" + foldername + "/" + activeLayer );

        File folder = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/" + filename + "/" + activeLayer + "/");
        Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/" + filename + "/" + activeLayer + "/");

        boolean success = true;
        if (!folder.exists()) {
            success = folder.mkdirs();
            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/" + filename + "/" + activeLayer + "/");
            Log.i("wait" , "Value1" + success);
        }

        //A01AG-LC1301B-12_Rev0(1).pdf-29271551749597518.ezp
//        A01AG-LC1301B-12_Rev0(1).pdf.ezp

        // Do something on success
        File sdCard = Environment.getExternalStorageDirectory();
        String abspath = sdCard.getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/" + filename + "/" + filename + "." +  ext + "-" + activeLayer +  ".ezp";


        String mainFilePath = sdCard.getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/" + filename + "/" + filename + "." +  ext + ".ezp";

        Log.i("wait" , "wait" + abspath);
        Log.i("wait" , "wait" + mainFilePath);

        Writer writer = null;

        try {
            writer = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(abspath), "utf-8"));
            writer.write(String.valueOf(response));
        } catch (IOException ex) {
            // Report
            ex.printStackTrace();

        } finally {

//            MainActivity.getTheLinkAndCallDoSomething(response);


            writetoMainFile(activeLayer , mainFilePath);

            try {writer.close();} catch (Exception ex) {/*ignore*/}
        }


    }

    private void writetoMainFile(String activeLayer , String path) {


        String read = readFile(path);

        Log.e("Wait" , read);

        MixedArray list;

        list = Pherialize.unserialize(read).toArray();

        Log.d("Wait", "FileName:1" + list.size());

        list.put(list.size(),activeLayer);

        Log.d("Wait", "FileName:1" + list);
        Log.d("Wait", "FileName:1" + String.valueOf(Pherialize.serialize(list)));


        Writer writer = null;

        try {
            writer = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(path), "utf-8"));
            writer.write(String.valueOf(Pherialize.serialize(list)));
        } catch (IOException ex) {
            // Report
            ex.printStackTrace();

        } finally {

            try {writer.close();} catch (Exception ex) { ex.printStackTrace(); }
        }

    }

    private void checkifFileExist(String arg_filename , String arg_o_filename) {

        Log.d("Original", "ssS" + arg_filename + arg_o_filename);


        String originalFilename = arg_o_filename;
        String filename = arg_filename;


        foldername = originalFilename;
        int pos = foldername.lastIndexOf(".");
        if (pos > 0) {
            foldername = foldername.substring(0, pos);
            Log.d("Files", "FileName:1" + foldername);
        }


        File sdCard = Environment.getExternalStorageDirectory();
        String path = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/" + foldername + "/" + filename;
//        String path = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/drawing2/css";



        Log.d("Files", "Path: " + path);
        File directory = new File(path);




//        File[] files = directory.listFiles();
//
//        if(directory.exists() && directory.isDirectory()) {
//            // do something here
//            Log.d("FilesLists", "FileName Yes:");
//        }else{
//
//            Log.d("FilesLists", "FileName No:");
//        }

//
//        Log.d("Files", "Size: "+ files.length);
//        for (File file : files) {
//            Log.d("Files", "FileName:1" + file.getName());
//
//
//
//        }


        String a = readFile(path);




        Log.d("Files", "FileName:1" + a);


        //get all layer list from main EZP file



        MixedArray list;

        list = Pherialize.unserialize(a).toArray();

        Log.d("Files", "FileName:1" + list);

        int i = 0;



        JSONArray alllayersList = new JSONArray();
        JSONObject imageCountArray = new JSONObject();


        while (i < list.size()) {
            Log.d("Files", "FileName:Data" + list.getString(i));

            String layers = sdCard.getAbsolutePath() + "/Android/data/" + getPackageName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/" + foldername + "/" + originalFilename + "-" + list.getString(i) + ".ezp";

            Log.d("Files", "FileName:Layers" + layers);


            //            Log.d("Files", "FileName:singleLayerData" + singleLayerData);





//
//
////            String singleLayerData = "{\"canvasData\":[{\"type\":\"image\",\"version\":\"2.0.0-rc.3\"}]}";
//
//            final int chunkSize = 2048;
//            for (int j = 0; j < singleLayerData.length(); j += chunkSize) {
//                Log.e("singleLayerData", singleLayerData.substring(j, Math.min(singleLayerData.length(), j + chunkSize)));
//            }
//

//            Log.d("Files", "FileName:singleLayerData1" + singleLayerData1);

           String singleLayerData = readFile(layers);

           singleLayerData = convertJSONString(singleLayerData);

            singleLayerData = trimDoubleQuotes(singleLayerData);




            try {

                String regex = "/\\r?\\n|\\r/g";

                singleLayerData = singleLayerData.replaceAll(regex, singleLayerData);

//                Log.d("single" , singleLayerData);


                final int chunkSize = 2048;
            for (int j = 0; j < singleLayerData.length(); j += chunkSize) {
                Log.e("singleLayerData", singleLayerData.substring(j, Math.min(singleLayerData.length(), j + chunkSize)));
            }


            Log.d("Files", "FileName:singleLayerData1" + singleLayerData);

                JSONObject jsonObject = new JSONObject(singleLayerData);
                //getting specific key values

                String jsonObject1 = jsonObject.getString("canvasData");

                JSONArray array1 = new JSONArray(jsonObject1);
                for (int l = 0; l < array1.length(); l++) {
                    JSONObject row = array1.getJSONObject(l);

                    jsonArray.put(row);

                }


//                student1.put("canvasData", jsonArray);
//
//                Log.d("jsonArray = ", "sss" + student1);
//
//                webView.post(new Runnable() {
//                    @Override
//                    public void run() {
//                        webView.setWebViewClient(new WebViewClient(){
//                            public void onPageFinished(WebView view, String url){
//                                //Here you want to use .loadUrl again
//                                //on the webView object and pass in
//                                //"javascript:<your javaScript function"
//
//
//
////                                view.loadUrl("javascript:java("+ student1 +")"); //if passing in an object. Mapping may need to take place
//                            }
//                        });
//                    }
//                });




            }catch (Exception ex) {
                ex.printStackTrace();
            }


            try {
                JSONObject jsonObject = new JSONObject(singleLayerData);
                //getting specific key values

                String jsonObject1 = jsonObject.getString("layers");

                Log.d("jsonLength ", "sss" + jsonObject1);

                JSONObject jsonObject2 = new JSONObject(jsonObject1);

                layersList.put(jsonObject2);

//                for (int l = 0; l < array1.length(); l++) {
//                    JSONObject row = array1.getJSONObject(l);
//
//                    jsonArray.put(row);
//
//                }


                Log.d("jsonArray = ", "sss" + jsonObject2);





            }catch (Exception ex) {
                ex.printStackTrace();
            }

            Log.d("layersList", "sss" + layersList);


            //layerslist

            alllayersList.put(list.getString(i));


            i++;
        }

        try {
            imageCountArray.put("undefined3511555105048664" , 1);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            finalJ.put("layers" , layersList);
            finalJ.put("canvasData" , jsonArray);
            finalJ.put("layerList" , alllayersList);
            finalJ.put("imageCountArray" , imageCountArray);
            finalJ.put("allitems" , "{\"undefined3511555105048664\":{\"1\":[]}}");
            finalJ.put("status" , 1);
            finalJ.put("eyeIcon" , "{}");
        } catch (JSONException e) {
            e.printStackTrace();
        }


        webView.post(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:java("+ finalJ +")"); //if passing in an object. Mapping may need to take place
            }
        });




    }

    public String trimDoubleQuotes(String text) {
        int textLength = text.length();

        if (textLength >= 2 && text.charAt(0) == '"' && text.charAt(textLength - 1) == '"') {
            return text.substring(1, textLength - 1);
        }

        return text;
    }

    public static String convertJSONString(String data) {
        data = data.replace("\\", "");
        return data; }



    public String readFile(String path){

        Log.d("Files", "is this running :1");


        File file = new File(path);



        String text = "";

        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line;

            while ((line = br.readLine()) != null) {
                text = line;
                Log.d("Files", "FileName:1" + line);
            }
            br.close();
        }
        catch (IOException e) {
            //You'll need to add proper error handling here
            Log.d("Files", "is this running :1" + e);
        }

        return text;

    }


    public static void readDom(String path) {

        Log.d("Files", "is this running :1" + path);

        try (JsonReader reader = new JsonReader(new FileReader(path))) {

            reader.setLenient(true);

            reader.beginObject();

            while (reader.hasNext()) {

                String name = reader.nextName();

                switch (name) {
                    case "canvasData":

//                        System.out.println(reader.nextString());


                        reader.beginArray();

                        Log.d("Files", "reader.nextString()" + reader.nextString());

                        break;
                    case "age":

                        System.out.println(reader.nextInt());

                        break;
                    case "messages":

                        // read array
                        reader.beginArray();

                        while (reader.hasNext()) {
                            System.out.println(reader.nextString());
                        }

                        reader.endArray();

                        break;
                    default:
                        reader.skipValue(); //avoid some unhandle events

                        break;
                }
            }

            reader.endObject();

        } catch (JsonSyntaxException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }







    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setContentView(R.layout.activity_main);

        instance = this;

        Log.d("Tag" , "Response: ");



// instantiate it within the onCreate method
        mProgressDialog = new ProgressDialog(MainActivity.this);
        mProgressDialog.setMessage("Downloading Files to Device Storage");
        mProgressDialog.setIndeterminate(true);
        mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressDialog.setCancelable(false);
        mProgressDialog.setCanceledOnTouchOutside(false);



        mProgressDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {

            @Override
            public void onCancel(DialogInterface dialog) {
                downloadTask.cancel(true); //cancel the task
            }
        });





//        registerReceiver(onComplete, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));



        // MY_PREFS_NAME - a static String variable like:
//public static final String MY_PREFS_NAME = "MyPrefsFile";


        SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

        int projectid = prefs.getInt("projectid", -37);

        int serviceaccount =prefs.getInt("service_account", -37);

        int currentUserid =prefs.getInt("current_User", -37);

        Log.d("checkifFileExist" , "checkifFileExist-pageNumber/" + projectid + "/" + serviceaccount + "/" + currentUserid);

//
//        downloadHandler downloadHandler = new downloadHandler();
//
//        int downloadResponse = downloadHandler.sendAndRequestResponse(projectid, serviceaccount, currentUserid);



//        uploadToServer uploadToServer = new uploadToServer();
//        uploadToServer.execute();



        webView = findViewById(R.id.webview);
        assert webView != null;
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webView.getSettings().setDefaultTextEncodingName("utf-8");



        webView.getSettings().setAppCacheMaxSize( 5 * 1024 * 1024 ); // 5MB
        webView.getSettings().setAppCachePath( getApplicationContext().getCacheDir().getAbsolutePath() );
        webView.getSettings().setAllowFileAccess( true );
        CookieManager.getInstance().setAcceptCookie(true);
        webView.getSettings().setAppCacheEnabled( true );
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.clearCache(false);
        webView.getSettings().setCacheMode( WebSettings.LOAD_DEFAULT ); // load online by default

        webView.setWebViewClient(new Callback());
        webView.addJavascriptInterface(new WebAppInterface(getApplicationContext()), "Android");

        if(Build.VERSION.SDK_INT >= 21){
            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        }else if(Build.VERSION.SDK_INT >= 19){
            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        }else {
            webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        }

        webView.setWebChromeClient(new WebChromeClient() {
            /*
             * openFileChooser is not a public Android API and has never been part of the SDK.
             */
            //handling input[type="file"] requests for android API 16+
            @SuppressLint("ObsoleteSdkInt")
            @SuppressWarnings("unused")
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture) {
                mUM = uploadMsg;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                Log.e("acceptType" , acceptType);
                Log.e("acceptType" , capture);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType("*/*");
                if (multiple_files && Build.VERSION.SDK_INT >= 18) {
                    i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                }
                startActivityForResult(Intent.createChooser(i, "File Chooser"), FCR);
            }

            //handling input[type="file"] requests for android API 21+
            @SuppressLint("InlinedApi")
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {

                Log.e("acceptType" , Arrays.toString(fileChooserParams.getAcceptTypes()));

                if (file_permission()) {
                    String[] perms = {Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.CAMERA};

                    //checking for storage permission to write images for upload
                    if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        ActivityCompat.requestPermissions(MainActivity.this, perms, FCR);

                        //checking for WRITE_EXTERNAL_STORAGE permission
                    } else if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, FCR);

                        //checking for CAMERA permissions
                    } else if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CAMERA}, FCR);
                    }
                    if (mUMA != null) {
                        mUMA.onReceiveValue(null);
                    }
                    mUMA = filePathCallback;

                    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

                    if(Arrays.toString(fileChooserParams.getAcceptTypes()).equals("[image/*]")){
                        Log.e("acceptType" , "IMage");
                        CAPTURE_MODE = 1;
                        takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    }else if(Arrays.toString(fileChooserParams.getAcceptTypes()).equals("[video/*]")){
                        takePictureIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
                        CAPTURE_MODE = 2;
                        Log.e("acceptType" , "IMage222");
                        dispatchTakeVideoIntent();


                    }


                    if(CAPTURE_MODE == 1) {


//                    Intent takePictureIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
                        if (takePictureIntent.resolveActivity(MainActivity.this.getApplicationContext().getPackageManager()) != null) {
                            File photoFile = null;
                            try {
                                photoFile = createImageFile();
                                takePictureIntent.putExtra("PhotoPath", mCM);
                            } catch (IOException ex) {
                                Log.e(TAG, "Image file creation failed", ex);
                            }
                            if (photoFile != null) {
                                mCM = "file:" + photoFile.getAbsolutePath();

                                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(photoFile));
                            } else {
                                takePictureIntent = null;
                            }
                        }
                        Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
                        contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);

                        if (Arrays.toString(fileChooserParams.getAcceptTypes()).equals("[image/*]")) {
                            contentSelectionIntent.setType("image/*");
                        } else if (Arrays.toString(fileChooserParams.getAcceptTypes()).equals("[video/*]")) {
                            contentSelectionIntent.setType("video/*");

                        }


                        if (multiple_files) {
                            contentSelectionIntent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                        }
                        Intent[] intentArray;
                        if (takePictureIntent != null) {
                            Log.e("eerer", "sss" + mCM);
                            intentArray = new Intent[]{takePictureIntent};
                        } else {
                            Log.e("eerer", "sss r" + mCM);
                            intentArray = new Intent[0];
                        }

                        Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
                        chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
                        chooserIntent.putExtra(Intent.EXTRA_TITLE, "File Chooser");
                        chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);
                        startActivityForResult(chooserIntent, FCR);

//                    startActivityForResult(ta, FCR);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
//                return false;
            }

        });


        Log.d("sdsd", "sdsd" + isNetworkAvailable());



            Log.i("wait" , "Value2" + downloadResponse1);

//            return;







        isStoragePermissionGranted();






        if ( !isNetworkAvailable() ) { // loading offline
            webView.getSettings().setCacheMode( WebSettings.LOAD_CACHE_ELSE_NETWORK );
            webView.loadUrl("file:///android_asset/drawing2/index.html");

        }else{

            //        webView.loadUrl("file:///android_asset/drawing2/calendar.html");
//        webView.loadUrl("file:///android_asset/drawing2/calendar.html");


//            webView.loadUrl("file:///android_asset/drawing2/offline.html");
//        webView.loadUrl("javascript:init('androidTest')");

//        webView.loadUrl("https://www.easypermit.net/index");
        webView.loadUrl("https://www.easypermit.net/#/login/signin");
//        webView.loadUrl("https://www.easypermit.net/#/app/ViewProjectDetails");
//        webView.loadUrl("https://easypermit.net/#/offline");
//            webView.loadUrl("file:///android_asset/drawing2/index.html");



        }







        // Force links and redirects to open in the WebView instead of in a browser
        webView.setWebViewClient(new WebViewClient(){
            public void onPageFinished(WebView view, String url){
                //Here you want to use .loadUrl again
                //on the webView object and pass in
                //"javascript:<your javaScript function"
                view.loadUrl("javascript:init('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')"); //if passing in an object. Mapping may need to take place
            }
        });



        WebView.setWebContentsDebuggingEnabled(true);




    }



    private void dispatchTakeVideoIntent() {
        Intent takeVideoIntent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
        if (takeVideoIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takeVideoIntent, REQUEST_VIDEO_CAPTURE);
        }
    }


    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService( CONNECTIVITY_SERVICE );
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
            Log.v(TAG,"Permission: "+permissions[0]+ "was "+grantResults[0]);
            //resume tasks needing this permission
        }
    }


    @Override
    public void onBackPressed() {

        WebView webView = findViewById(R.id.webview);

        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }





    public static void getTheLinkAndCallDoSomething(String downloadResponse1){

        Log.i("wait" , "Value3getLInkl" + downloadResponse1);

        final String finalDownloadResponse = downloadResponse1;

        webView.post(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:calendar1('"+ finalDownloadResponse +" , " + serviceaccount + " , " + projectid + "')"); //if passing in an object. Mapping may need to take place
            }
        });


    }


    public boolean file_permission(){
        if(Build.VERSION.SDK_INT >=23 && (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED)) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.CAMERA}, 1);
            return false;
        }else{
        return true;
        }
    }

    //creating new image file here
    private File createImageFile() throws IOException {
        @SuppressLint("SimpleDateFormat") String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "img_"+timeStamp+"_";
        File storageDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        return File.createTempFile(imageFileName,".jpg",storageDir);
    }

    //back/down key handling
    @Override
    public boolean onKeyDown(int keyCode, @NonNull KeyEvent event){
        if(event.getAction() == KeyEvent.ACTION_DOWN){
            switch(keyCode){
                case KeyEvent.KEYCODE_BACK:
                    if(webView.canGoBack()){
                        webView.goBack();
                    }else{
                        finish();
                    }
                    return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig){
        super.onConfigurationChanged(newConfig);
    }


    //callback reporting if error occurs
    public class Callback extends WebViewClient {
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl){
            Toast.makeText(new MainActivity(), "Failed loading app!", Toast.LENGTH_SHORT).show();
        }
    }

    public static Context getContext() {
        return instance.getApplicationContext();
    }

    public static WebView webview(){
        return webView;
    }



//
//    BroadcastReceiver onComplete=new BroadcastReceiver() {
//        public void onReceive(Context ctxt, Intent intent) {
//
//            Log.e("downlocCOmplete" , "onReceieve");
//
//            downloadedFileCount++;
//
//
//            webView.post(new Runnable() {
//                @Override
//                public void run() {
//                    webView.loadUrl("javascript:download__status('resume', " + downloadedFileCount + ")");
//                }
//            });
//
//            Log.e("downlocCOmplete" , "onReceieve" + downloadedFileCount);
//            Log.e("downlocCOmplete" , "onReceieve" + totalFileCount);
//
//            if(downloadedFileCount == totalFileCount) {
//
//                Log.e("downlocCOmplete" , "COmpleted");
//
//                downloadComplete();
//            }
//        }
//    };



    public void downloadComplete(){


        SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

        projectid = prefs.getInt("projectid", -37);

        serviceaccount =prefs.getInt("service_account", -37);

        currentUserid =prefs.getInt("current_User", -37);

        Log.d("allfileList" , "allfileList" + allfileList);

        Log.d("checkifFileExist" , "checkifFileExist-pageNumber/" + projectid + "/" + serviceaccount + "/" + currentUserid);

        boolean isNotFound = false;

        Log.d("tester", "sss" + serviceaccount);
        Log.d("tester", "sss" + projectid);

        if(null != allfileList) {

            for (int i = 0; i < allfileList.length(); i++) {


                try {
                    Log.d("Files", "Path: " + allfileList.get(i));
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                File f = null;
                try {

                    String replacedStr = String.valueOf(allfileList.get(i)).replace("https://easypermit.net/storage/" + serviceaccount + "/Common/" + projectid + "/drw(progress)", "");

                    File sdCard = Environment.getExternalStorageDirectory();
                    String path = sdCard.getAbsolutePath() + "/Android/data/com.hanum.ezpermit.ezpermitoffile/files/downloads/" + serviceaccount + "-" + projectid + replacedStr;


                    f = new File(path);

                    Log.d("Files", "Path: " + path);
                    Log.d("Files", "Path: " + allfileList.get(i));


                    if (!f.exists()) {

                        isNotFound = true;

                        Log.d("Not Found" , String.valueOf(f));

                        break;

                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }

            if (!isNotFound) {


                webView.post(new Runnable() {
                    @Override
                    public void run() {
                        webView.loadUrl("javascript:checkDataonStorage('not_empty')"); //if passing in an object. Mapping may need to take place
                    }
                });


//                webView.post(new Runnable() {
//                    @Override
//                    public void run() {
//                        webView.loadUrl("javascript:download__status('completed',0)");
//                    }
//                });


                Log.e("checkDataonStorage1111", "!null");


            } else {

                Log.e("checkDataonStorage22222", "nullll");


//                webView.post(new Runnable() {
//                    @Override
//                    public void run() {
//                        webView.loadUrl("javascript:checkDataonStorage('empty')"); //if passing in an object. Mapping may need to take place
//                    }
//                });


                webView.post(new Runnable() {
                    @Override
                    public void run() {
                        webView.loadUrl("javascript:download__status('completed',0)");
                    }
                });


            }

        }

    }




    public  boolean isStoragePermissionGranted() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (checkSelfPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    == PackageManager.PERMISSION_GRANTED) {
                Log.v(TAG,"Permission is granted");
                return true;
            } else {

                Log.v(TAG,"Permission is revoked");
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
                return false;
            }
        }
        else { //permission is automatically granted on sdk<23 upon installation
            Log.v(TAG,"Permission is granted");
            return true;
        }
    }


    public boolean moveFile(String sourcePath, String targetPath) {

        Log.e("movingFile" , "Source" + sourcePath);
        Log.e("movingFile" , "Source" + targetPath);

        File fileToMove = new File(sourcePath);

        Boolean result = fileToMove.renameTo(new File(targetPath));

        Log.e("movingFile" , "Source" + result);

        return result;
    }

    public String getExt(String filePath){
        int strLength = filePath.lastIndexOf(".");
        if(strLength > 0)
            return filePath.substring(strLength + 1).toLowerCase();
        return null;
    }


    /**
     * Retrieve video frame image from given video path
     *
     * @param p_videoPath
     *            the video file path
     *
     * @return Bitmap - the bitmap is video frame image
     *
     * @throws Throwable
     */
    @SuppressLint("NewApi")
    public static Bitmap retriveVideoFrameFromVideo(String p_videoPath)
            throws Throwable
    {
        Bitmap m_bitmap = null;
        MediaMetadataRetriever m_mediaMetadataRetriever = null;
        try
        {
            m_mediaMetadataRetriever = new MediaMetadataRetriever();
            m_mediaMetadataRetriever.setDataSource(p_videoPath);
            m_bitmap = m_mediaMetadataRetriever.getFrameAtTime();
        }
        catch (Exception m_e)
        {
            throw new Throwable(
                    "Exception in retriveVideoFrameFromVideo(String p_videoPath)"
                            + m_e.getMessage());
        }
        finally
        {
            if (m_mediaMetadataRetriever != null)
            {
                m_mediaMetadataRetriever.release();
            }
        }
        return m_bitmap;
    }


    private static final String newLine  = System.getProperty("line.separator");

    private boolean isCancelled = false;

    // usually, subclasses of AsyncTask are declared inside the activity class.
// that way, you can easily modify the UI thread from here
    public class DownloadTask extends AsyncTask<JSONArray, Integer, String> {

        private Context context;
        private PowerManager.WakeLock mWakeLock;

        int progress = 0;
        Notification notification;
        NotificationManager notificationManager;
        NotificationCompat.Builder notificationBuilder;

        public DownloadTask(Context context) {
            this.context = context;
        }


        @Override
        protected String doInBackground(JSONArray... jsonArrays) {
            InputStream input = null;
            OutputStream output = null;
            HttpURLConnection connection = null;


            JSONArray array = jsonArrays[0];

            for (int i = 0; i < array.length(); i++) {

                String URL;
                try {


                    URL = (String) array.get(i);

                    URL url = new URL(URL);
                    connection = (HttpURLConnection) url.openConnection();
                    connection.connect();

                    // expect HTTP 200 OK, so we don't mistakenly save error report
                    // instead of the file
                    if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                        return "Server returned HTTP " + connection.getResponseCode()
                                + " " + connection.getResponseMessage();
                    }

                    // this will be useful to display download percentage
                    // might be -1: server did not report the length
                    int fileLength = connection.getContentLength();


                    String fileName = URL.substring(URL.lastIndexOf('/') + 1, URL.length());


                    SharedPreferences prefs = getSharedPreferences("USER_DATA", MODE_PRIVATE);

                    projectid = prefs.getInt("projectid", -37);

                    serviceaccount = prefs.getInt("service_account", -37);

                    currentUserid = prefs.getInt("current_User", -37);

//
//
                    String path = Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/" + fileName;
                    Log.i("wait", "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + serviceaccount + "-" + projectid + "/" + fileName);


                    // download the file
                    input = connection.getInputStream();
                    output = new FileOutputStream(path);


                    byte data[] = new byte[4096];
                    long total = 0;
                    int count;
                    while ((count = input.read(data)) != -1 && !isCancelled) {
                        // allow canceling with back button


                        if (isCancelled() || isCancelled) {
                            input.close();
                            return null;
                        }
                        total += count;
                        // publishing the progress....
                        if (fileLength > 0 && !isCancelled) // only if total length is known
                            publishProgress((int) (total * 100 / fileLength));
                        output.write(data, 0, count);
                    }

                } catch (Exception e) {
                    return e.toString();
                } finally {
                    try {
                        if (output != null)
                            output.close();
                        if (input != null)
                            input.close();
                    } catch (IOException ignored) {
                    }

                    if (connection != null)
                        connection.disconnect();
                }

                downloadedFileCount++;

                Log.d("result", "pendingggggggg" + URL);
                Log.d("result", "pendingggggggg" + downloadedFileCount);


            }
            return null;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            // take CPU lock to prevent CPU from going off if the user
            // presses the power button during download
            PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
            mWakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK,
                    getClass().getName());
            mWakeLock.acquire();
//
            mProgressDialog.setButton(DialogInterface.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener(){
                // Set a click listener for progress dialog cancel button
                @Override
                public void onClick(DialogInterface dialog, int which){
                    // dismiss the progress dialog
//                        downloadTask.cancel(true); //cancel the task
                        isCancelled = true;


                    Log.d("Runnable" , "called" + isCancelled);

                }
            });


        }


        @Override
        protected void onProgressUpdate(Integer... progress) {
            super.onProgressUpdate(progress);
            // if we get here, length is known, now set indeterminate to false

            Log.d("result" , "pendingggggggg" + downloadedFileCount);

            mProgressDialog.setIndeterminate(false);
            mProgressDialog.setMax(totalFileCount);
            mProgressDialog.setProgress(downloadedFileCount);



        }

        @Override
        protected void onPostExecute(String result) {

            Log.d("result" , "pendingggggggg" + downloadedFileCount);

            if (result != null)
                Log.d("result" , "null");
            else
                Log.d("result" , "not_null");



//            webView.post(new Runnable() {
//                @Override
//                public void run() {
//                    webView.loadUrl("javascript:download__status('resume', " + downloadedFileCount + ")");
//                }
//            });



//                            Toast.makeText(context,"File downloaded", Toast.LENGTH_SHORT).show();



//            if (result != null)
//                Toast.makeText(context,"Download error: "+result, Toast.LENGTH_LONG).show();
//            else
//                Toast.makeText(context,"File downloaded", Toast.LENGTH_SHORT).show(); downloadedFileCount++;

            if(totalFileCount == downloadedFileCount){


                mWakeLock.release();
                mProgressDialog.dismiss();


                downloadComplete();


            }

    }

    }




/**
*
*   all download handler
*
*
 */

private int dataResponse = 0;
    private RequestQueue requestQueue;
    private JsonObjectRequest  mStringRequest;
    private String url;
    public JSONArray arryaList;
    public String calendar;



public int sendAndRequestResponse(final int projID, final int servID, int userID) {


    Log.i("aaaaaaaaaaaaaa" , "Value" + projID + "/" + servID);


    mProgressDialog.show();



    url = "https://easypermit.net/assets/views/phppages/allProjectController.php?offlinePackageRequest=offlinePackageRequest&ProjectId="+projID + "&ServiceId="+servID + "&CurrentUser="+userID;


    // Creates the Volley request queue
    requestQueue = Volley.newRequestQueue(MainActivity.getContext());

    // Casts results into the TextView found within the main layout XML with id jsonData

    // Creating the JsonObjectRequest class called obreq, passing required parameters:
    //GET is used to fetch data from the server, JsonURL is the URL to be fetched from.
    JsonObjectRequest obreq = new JsonObjectRequest(Request.Method.GET, url, null,
            // The third parameter Listener overrides the method onResponse() and passes
            //JSONObject as a parameter
            new Response.Listener<JSONObject>() {

                // Takes the response from the JSON request
                @Override
                public void onResponse(JSONObject response) {
                    try {


                        JSONArray obj1 = response.getJSONArray("fileList");


                        downloadedFileCount = 0;


                        String replacement = response.getString("replacement");

                        totalFileCount = Integer.parseInt(response.getString("fileListLength"));

                        final JSONArray arryaList = response.getJSONArray("arraylist");


                        allfileList = response.getJSONArray("fileList");

                        Log.i("aaaaaaaaaaaaaa222222" , "Value" + arryaList);


                        File folder1 = new File(Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
                        Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());

                        boolean success1 = true;
                        if (!folder1.exists()) {
                            Log.i("wait" , "ValueIn1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName());
                            success1 = folder1.mkdirs();
                            Log.e("wait" , "ValueIn1" + success1);

                        }

                        File folder2 = new File(Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
                        Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());

                        boolean success2 = true;
                        if (!folder2.exists()) {
                            Log.i("wait" , "ValueIn12222" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName());
                            success2 = folder2.mkdirs();
                            Log.e("wait" , "ValueIn1" + success2);
                        }

                        File folder = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/");
                        Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/");

                        boolean success = true;
                        if (!folder.exists()) {
                            success = folder.mkdirs();
                        }

                        File serviceAccount = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/");
                        Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/");

                        boolean success__serviceAccount = true;
                        if (!serviceAccount.exists()) {
                            success__serviceAccount = serviceAccount.mkdirs();
                            Log.e("wait" , "ValueIn1" + success__serviceAccount);
                        }

                        File projectAccount = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + servID + "-" + projID + "/");
                        Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + servID + "-" + projID + "/");

                        boolean success__projectAccount = true;
                        if (!projectAccount.exists()) {
                            success__projectAccount = projectAccount.mkdirs();
                            Log.e("wait" , "ValueIn1" + success__projectAccount);
                        }


                        DownloadTask downloadTask = new DownloadTask(MainActivity.this);
                        downloadTask.execute(obj1);



//                        for(int i = 0; i < obj1.length(); i++){
//                            String object = (String) obj1.get(i);
//                            Log.i("aaaaaaaaaaaaaa" , "Value" + object);
//
//
//
//                            //don't add ending slash
//
//                            dataResponse = 1;
//
//
////                            File folder1 = new File(Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
////                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
////
////                            boolean success1 = true;
////                            if (!folder1.exists()) {
////                                Log.i("wait" , "ValueIn1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName());
////                                success1 = folder1.mkdirs();
////                                Log.e("wait" , "ValueIn1" + success1);
////
////                            }
////
////                            File folder2 = new File(Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
////                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
////
////                            boolean success2 = true;
////                            if (!folder2.exists()) {
////                                Log.i("wait" , "ValueIn12222" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName());
////                                success2 = folder2.mkdirs();
////                                Log.e("wait" , "ValueIn1" + success2);
////                            }
////
////                            File folder = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/");
////                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/");
////
////                            boolean success = true;
////                            if (!folder.exists()) {
////                                success = folder.mkdirs();
////                            }
////
////                            File serviceAccount = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/");
////                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/");
////
////                            boolean success__serviceAccount = true;
////                            if (!serviceAccount.exists()) {
////                                success__serviceAccount = serviceAccount.mkdirs();
////                                Log.e("wait" , "ValueIn1" + success__serviceAccount);
////                            }
////
////                            File projectAccount = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + servID + "-" + projID + "/");
////                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/downloads/" + servID + "-" + projID + "/");
////
////                            boolean success__projectAccount = true;
////                            if (!projectAccount.exists()) {
////                                success__projectAccount = projectAccount.mkdirs();
////                                Log.e("wait" , "ValueIn1" + success__projectAccount);
////                            }
//
//                            Log.e("Path check", object);
//
//
////                            webView.post(new Runnable() {
////                                @Override
////                                public void run() {
////                                    webView.loadUrl("javascript:download__status('started', "+ totalFileCount +")");
////                                }
////                            });
//
//
////                            webView.post(new Runnable() {
////                                @Override
////                                public void run() {
////                                    webView.loadUrl("javascript:download__status('started', "+ totalFileCount +")");
////                                }
////                            });
//
//                            if(!isCancelled) {
//
//
////                                DownloadTask downloadTask = new DownloadTask(MainActivity.this);
////                                downloadTask.execute(object);
//
//
//                                // execute this when the downloader must be fired
//
//
//                            }
//
////                                    DownloadTask downloadTask = new DownloadTask();
////
////
////
////                                    downloadTask.replacement = replacement;
////                                    downloadTask.path = object;
////                                    downloadTask.suggestedFolder = null;
////                                    downloadTask.servID = servID;
////                                    downloadTask.projID = projID;
////
////
////                                    downloadTask.execute();
//
//
//
//
//
////                        downloadFile("https://easypermit.net/storage/29/Common/39/drw(progress)", object);
////                        downloadFile("https://easypermit.net/assets/offline", object);
//
//                        }

                        // Adds strings from object to the "data" string


                        // Adds the data string to the TextView "results"

                    }
                    // Try and catch are included to handle any errors due to JSON
                    catch (JSONException e) {
                        // If an error occurs, this prints the error to the log
                        e.printStackTrace();
                    }
                }
            },
            // The final parameter overrides the method onErrorResponse() and passes VolleyError
            //as a parameter
            new Response.ErrorListener() {
                @Override
                // Handles errors that occur due to Volley
                public void onErrorResponse(VolleyError error) {
                    Log.e("Volley", "Error" + error);
                }
            }
    );
    // Adds the JSON object request "obreq" to the request queue
    requestQueue.add(obreq);

    return dataResponse;
}







}
