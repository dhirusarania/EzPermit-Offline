    package com.hanum.ezpermit.ezpermitoffile;


    import android.app.DownloadManager;
    import android.content.Context;
    import android.net.Uri;
    import android.os.Build;
    import android.os.Environment;
    import android.util.Log;
    import android.widget.ProgressBar;

    import com.android.volley.Request;
    import com.android.volley.RequestQueue;
    import com.android.volley.Response;
    import com.android.volley.VolleyError;
    import com.android.volley.toolbox.JsonObjectRequest;
    import com.android.volley.toolbox.Volley;

    import org.json.JSONArray;
    import org.json.JSONException;
    import org.json.JSONObject;

    import java.io.BufferedInputStream;
    import java.io.BufferedWriter;
    import java.io.File;
    import java.io.FileOutputStream;
    import java.io.IOException;
    import java.io.InputStream;
    import java.io.OutputStream;
    import java.io.OutputStreamWriter;
    import java.io.Writer;
    import java.net.URL;
    import java.net.URLConnection;
    import java.util.Objects;


    public class downloadHandler extends MainActivity {



        Context context = MainActivity.getContext();

        private static final String TAG = MainActivity.class.getName();
        private int dataResponse = 0;
        private RequestQueue requestQueue;
        private JsonObjectRequest  mStringRequest;
        private String url;
        public JSONArray arryaList;
        public String calendar;

        public int totalFileCount = 0;
        public int downloadedFileCount = 0;

        public int isDownloadFailed = 0;


        public DownloadManager manager1;


        protected ProgressBar mProgressBar;




        public int sendAndRequestResponse(int projID, int servID, int userID) {


            Log.i("aaaaaaaaaaaaaa" , "Value" + projID + "/" + servID);


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


                                String replacement = response.getString("replacement");
                                totalFileCount = Integer.parseInt(response.getString("fileListLength"));

                                final JSONArray arryaList = response.getJSONArray("arraylist");


                                allfileList = response.getJSONArray("fileList");

                                Log.i("aaaaaaaaaaaaaa" , "Value" + arryaList);


                                for(int i = 0; i < obj1.length(); i++){
                                    String object = (String) obj1.get(i);
                        Log.i("aaaaaaaaaaaaaa" , "Value" + object);



                        //don't add ending slash

                        dataResponse = 1;


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
                                    if (isDownloadFailed == 0) {

                                        downloadFile(replacement, object , null);


                                    }



//                        downloadFile("https://easypermit.net/storage/29/Common/39/drw(progress)", object);
//                        downloadFile("https://easypermit.net/assets/offline", object);

                    }

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
                            Log.e("Volley", "Error");
                        }
                    }
            );
            // Adds the JSON object request "obreq" to the request queue
            requestQueue.add(obreq);

            return dataResponse;
        }


        public int checkFiles(int projID, int servID, int userID) {


            Log.i("aaaaaaaaaaaaaa" , "Value" + projID + "/" + servID);


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


                                String replacement = response.getString("replacement");
                                totalFileCount = Integer.parseInt(response.getString("fileListLength"));

                                final JSONArray arryaList = response.getJSONArray("arraylist");


                                allfileList = response.getJSONArray("fileList");


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
                            Log.e("Volley", "Error");
                        }
                    }
            );
            // Adds the JSON object request "obreq" to the request queue
            requestQueue.add(obreq);

            return dataResponse;
        }


        public JSONArray sendAndRequestResponse1(int projID, int servID, int userID) {




            Log.i("aaaaaaaaaaaaaa" , "Value" + projID + "/" + servID);


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


                                String replacement = response.getString("replacement");

                                calendar = response.getString("value");

                                Log.i("wait" , "Value1downoad" + calendar);



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
//                                File folder2 = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName()  + "/files");
//                                Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName()  + "/files");
//
//                                if (!folder2.exists()) {
//                                    Log.i("wait" , "ValueIn2" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName()  + "/files");
//                                    folder2.mkdirs();
//                                }


                                File folder = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/calendar");
                                Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/calendar");

                                boolean success = true;
                                if (!folder.exists()) {
                                    success = folder.mkdirs();
                                }

                                    // Do something on success
                                    File sdCard = Environment.getExternalStorageDirectory();
                                    String path = sdCard.getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/calendar/" + "main.json";

                                    Log.i("wait" , "Value1" + path);


                                    Writer writer = null;

                                    try {
                                        writer = new BufferedWriter(new OutputStreamWriter(
                                                new FileOutputStream(path), "utf-8"));
                                        writer.write(String.valueOf(calendar));
                                    } catch (IOException ex) {
                                        // Report
                                    } finally {

                                        MainActivity.getTheLinkAndCallDoSomething(calendar);

                                        try {writer.close();} catch (Exception ex) {/*ignore*/}
                                    }



                                // Do something else on failure


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
                            Log.e("Volley", "Error");
                        }
                    }
            );
            // Adds the JSON object request "obreq" to the request queue
            requestQueue.add(obreq);

            return arryaList;
        }

        public void clearFiles(int projID, int servID, int userID) {




            Log.i("aaaaaaaaaaaaaa" , "Value" + projID + "/" + servID);


            url = "https://easypermit.net/assets/views/phppages/allProjectController.php?changeStatus=changeStatus&ProjectId="+projID + "&ServiceId="+servID + "&CurrentUser="+userID;


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

                            Log.i("wait" , "Value1downoad" + response);
                        }
                    },
                    // The final parameter overrides the method onErrorResponse() and passes VolleyError
                    //as a parameter
                    new Response.ErrorListener() {
                        @Override
                        // Handles errors that occur due to Volley
                        public void onErrorResponse(VolleyError error) {
                            Log.e("Volley", "Error");
                        }
                    }
            );
            // Adds the JSON object request "obreq" to the request queue
            requestQueue.add(obreq);

        }



        public JSONArray getUserData(int projID, final int servID, final int userID) {




            Log.i("aaaaaaaaaaaaaa" , "Value" + projID + "/" + servID);


            url = "https://easypermit.net/assets/views/phppages/allProjectController.php?getUserInfo=getUserInfo&ProjectId="+projID + "&ServiceId="+servID + "&CurrentUser="+userID;


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

                            File folder1 = new File(Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());
                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory() + "/Android/data/" + getClass().getPackage().getName());

                            boolean success1 = true;
                            if (!folder1.exists()) {
                                Log.i("wait" , "ValueIn1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName());
                                success1 = folder1.mkdirs();
                                Log.e("wait" , "ValueIn1" + success1);

                            }


                            File folder = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/calendar");
                            Log.i("wait" , "Value1" + Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/calendar");

                            boolean success = true;
                            if (!folder.exists()) {
                                success = folder.mkdirs();
                            }

                            // Do something on success
                            File sdCard = Environment.getExternalStorageDirectory();
                            String path = sdCard.getAbsolutePath() + "/Android/data/" + getClass().getPackage().getName() + "/files/calendar/" + "userData.json";

                            Log.i("wait" , "Value1" + path);

//                            Log.i("wait" , "Value1" + "https://www.easypermit.net/storage/" + servID + "/Common/" + userID + "/drw(progress)/p21.pdf");
//
//
//                            downloadFile(null, "https://www.easypermit.net/storage/" + servID +"/Common/" + userID + "/drw(progress)/p21.pdf" , "calendar/profile.png");


                            Log.i("wait" , "Value1" + "https://www.easypermit.net/storage/" + servID +"/Private/" + userID + "/.info/_profile" + userID);


                            downloadFile(null, "https://www.easypermit.net/storage/" + servID +"/Private/" + userID + "/.info/_profile" + userID , "/calendar");


                            Writer writer = null;

                            try {
                                writer = new BufferedWriter(new OutputStreamWriter(
                                        new FileOutputStream(path), "utf-8"));
                                writer.write(String.valueOf(calendar));
                            } catch (IOException ex) {
                                // Report
                            } finally {

                                MainActivity.getTheLinkAndCallDoSomething(calendar);

                                try {writer.close();} catch (Exception ex) {/*ignore*/}
                            }


                            // Do something else on failure


                            // Adds strings from object to the "data" string


                            // Adds the data string to the TextView "results"

                        }
                    },
                    // The final parameter overrides the method onErrorResponse() and passes VolleyError
                    //as a parameter
                    new Response.ErrorListener() {
                        @Override
                        // Handles errors that occur due to Volley
                        public void onErrorResponse(VolleyError error) {
                            Log.e("Volley", "Error");
                        }
                    }
            );
            // Adds the JSON object request "obreq" to the request queue
            requestQueue.add(obreq);

            return arryaList;
        }





// }
//        public int sendAndRequestResponse() {
//
//            //RequestQueue initialized
//            mRequestQueue = Volley.newRequestQueue(context);
//
//            //String Request initialized
//            JsonObjectRequest mStringRequest  = new JsonObjectRequest(Request.Method.GET, url, null,
//                    new Response.Listener<JSONObject>(){
//            @Override
//                public void onResponse(JSONObject response) {
//
//                    Log.i("aaaaaaaaaaaaaa","Response :" + response);
//
//
//                try {
//
//
////                    Downloader dl = new Downloader(Environment.getDataDirectory().getAbsolutePath() + "/files", "https://easypermit.net/assets/offline/version.json");
////
////                    dl.setDownloaderCallback(new Downloader.DownloaderCallback() {
////                        @Override
////                        public void onProgress(int progress) {
////                            Log.i("Path" , "onProgress");
////                        }
////
////                        @Override
////                        public void onFinish() {
////                            Log.i("Path" , "onFinish");
////                        }
////
////                        @Override
////                        public void onError(String message) {
////                            Log.i("Path" , "onError" + message);
////                        }
////                    });
////
////                    dl.start();
//
//                    JSONArray obj1 = response.getJSONArray("fileList");
////
////
////                    for(int i = 0; i < obj1.length(); i++){
////                        String object = (String) obj1.get(i);
////                        Log.i("aaaaaaaaaaaaaa" , "Value" + object);
//
//
//
//
//                        downloadFile("https://easypermit.net/storage/29/Common/39/drw(progress)/", object);
//                        // now do something with the Object
////                    }
////                    JSONArray keys = obj1.names ();
//
////                    Log.i("aaaaaaaaaaaaaa" , "Value" + keys);
////                    Log.i("aaaaaaaaaaaaaa" , "Value" + obj1);
//
////
////                    String obj = response.getString("version");
////                    Log.i("aaaaaaaaaaaaaa","Version : " + obj);
////
////                    for (int i = 0; i < keys.length (); ++i) {
////
////                        String key = keys.getString (i); // Here's your key
////                        String value = obj1.getString (key); // Here's your value
////
////                        Log.e("aaaaaaaaaaaaaa" , "Value" + key + value);
////
////                    }
//
//
//                    dataResponse = 1;
//
////                    downloadFile();
//
//                } catch (JSONException e) {
//                    Log.i("aaaaaaaaaaaaaa" , "Error Log" + e);
//                    e.printStackTrace();
//                }
//
//
//
//            }
//            }, new Response.ErrorListener() {
//                @Override
//                public void onErrorResponse(VolleyError error) {
//
//                    Log.i(TAG,"Error :" + error.toString());
//                }
//            });
//
//            mRequestQueue.add(mStringRequest);
//            return dataResponse;
//        }



        public static class Downloader extends Thread implements Runnable{
            private String url;
            private String path;
            private DownloaderCallback listener=null;

            public Downloader(String path, String url){
                this.path=path;
                this.url=url;
            }

            public void run(){

                Log.i("Pather" , "Path" + path);

                try {
                    URL url = new URL(this.url);
                    URLConnection urlConnection = url.openConnection();
                    urlConnection.connect();

                    String filename = "vbersion.json";
                    // your filename should be in this header... adapt the next line for your case
//                    filename = filename.substring(filename.indexOf("filename")+10, filename.length()-2);

                    int total = urlConnection.getContentLength();
                    int count;

                    InputStream input = new BufferedInputStream(url.openStream());
                    OutputStream output = new FileOutputStream(path+"/"+filename);


                    Log.i("Pather" , "Path" + path+"/"+filename);



                    byte data[] = new byte[4096];
                    long current = 0;

                    while ((count = input.read(data)) != -1) {
                        current += count;
                        if(listener!=null){
                            listener.onProgress((int) ((current*100)/total));
                        }
                        output.write(data, 0, count);
                    }

                    output.flush();

                    output.close();
                    input.close();

                    if(listener!=null){
                        listener.onFinish();
                    }
                } catch (Exception e) {
                    if(listener!=null)
                        listener.onError(e.getMessage());
                }
            }

            public void setDownloaderCallback(DownloaderCallback listener){
                this.listener=listener;
            }

            public interface DownloaderCallback{
                void onProgress(int progress);
                void onFinish();
                void onError(String message);
            }
        }


        private void downloadFile(String replacement, String path , String suggestedFolder) {
            String DownloadUrl = path;
            String replacedStr;

            if(suggestedFolder == null){

                replacedStr = DownloadUrl.replace(replacement, "");

            }else{

                replacedStr = suggestedFolder;

            }

            DownloadManager.Request request1 = new DownloadManager.Request(Uri.parse(DownloadUrl));
            request1.setDescription("Calendar Data Files");   //appears the same in Notification bar while downloading
            request1.setTitle(replacedStr);
            request1.setVisibleInDownloadsUi(false);
            Log.e("aaaaaaaaaaaaaaaa" , "downloaded: " + replacedStr);
            Log.e("aaaaaaaaaaaaaaaa" , "downloaded: " + DownloadUrl);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                request1.allowScanningByMediaScanner();
                request1.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
            }
            request1.setDestinationInExternalFilesDir(context, null, replacedStr);

            manager1 = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            Objects.requireNonNull(manager1).enqueue(request1);
            if (DownloadManager.STATUS_SUCCESSFUL == 8) {
                Log.e("aaaaaaaaaaaaaaaa" , "downloaded");

                downloadedFileCount++;


                if(downloadedFileCount == totalFileCount){


                    MainActivity.downloadComplete();
                }

            }else{


                isDownloadFailed = 1;

                Log.e("aaaaaaaaaaaaaaaa" , "not downloaded");



            }

//            final long downloadId = manager1.enqueue(request1);
//
////            mProgressBar = this.activity.findViewById(R.id.progress_bar);
//            Timer myTimer = new Timer();
//            myTimer.schedule(new TimerTask() {
//                @Override
//                public void run() {
//                    DownloadManager.Query q = new DownloadManager.Query();
//                    q.setFilterById(downloadId);
//                    Cursor cursor = manager1.query(q);
//                    cursor.moveToFirst();
//                    int bytes_downloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
//                    int bytes_total = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
//                    cursor.close();
//                    final int dl_progress = (bytes_downloaded * 100 / bytes_total);
//
//                    Log.e("Progress" , "P= " + dl_progress);
//
//                    ((MainActivity)getContext().run(new Runnable(){
//                        @Override
//                        public void run(){
//                            Log.e("Progress" , "P= " + dl_progress);
////                            mProgressBar.setProgress(dl_progress);
//                        }
//                    }));
//
//                }
//
//            }, 0, 10);

    }

//        downloadHandler(Activity _activity) {
//
//            this.activity = _activity;
//
//        }



        }



