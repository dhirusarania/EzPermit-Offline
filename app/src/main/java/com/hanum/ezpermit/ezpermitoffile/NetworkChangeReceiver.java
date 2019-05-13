package com.hanum.ezpermit.ezpermitoffile;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class NetworkChangeReceiver extends BroadcastReceiver {

    @SuppressLint("UnsafeProtectedBroadcastReceiver")
    @Override
    public void onReceive(final Context context, final Intent intent) {

        String status = NetworkUtil.getConnectivityStatusString(context);

        Toast.makeText(context, status, Toast.LENGTH_LONG).show();

//        WebView webView = MainActivity.webview();
//
//        if(status.equals("Not connected to Internet")){
//
//
//            webView.setWebViewClient(new WebViewClient(){
//                public void onPageFinished(WebView view, String url){
//                    //Here you want to use .loadUrl again
//                    //on the webView object and pass in
//                    //"javascript:<your javaScript function"
//                    view.loadUrl("javascript:networkChanged('offline')"); //if passing in an object. Mapping may need to take place
//                }
//            });
//
//        }else{
//
//            webView.setWebViewClient(new WebViewClient(){
//                public void onPageFinished(WebView view, String url){
//                    //Here you want to use .loadUrl again
//                    //on the webView object and pass in
//                    //"javascript:<your javaScript function"
//                    view.loadUrl("javascript:networkChanged('online')"); //if passing in an object. Mapping may need to take place
//                }
//            });
//
//
//    }





//        WebView webView = MainActivity.webview();

//        webView.loadUrl("file:///android_asset/drawing2/offline.html");

    }
}