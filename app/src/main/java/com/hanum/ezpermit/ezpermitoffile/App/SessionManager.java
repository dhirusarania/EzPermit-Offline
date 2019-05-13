package com.hanum.ezpermit.ezpermitoffile.App;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.util.Log;

public class SessionManager {
    // LogCat tag
    private static String TAG = SessionManager.class.getSimpleName();

    // Shared Preferences
    private SharedPreferences pref;

    private Editor editor;

    // Shared preferences file name
    private static final String PREF_NAME = "AndroidHiveLogin";

    private static final String KEY_IS_LOGGEDIN = "isLoggedIn";

    private static final String KEY_isPendingConfirm = "confirm";

    public SessionManager(Context context) {
        int PRIVATE_MODE = 0;
        pref = context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
        editor.apply();
    }

    public void setLogin(boolean isLoggedIn) {

        editor.putBoolean(KEY_IS_LOGGEDIN, isLoggedIn);

        // commit changes
        editor.apply();

        Log.d(TAG, "User login session modified!");
    }

    public void setRegisterConfirm(boolean isPendingConfirm) {

        editor.putBoolean(KEY_isPendingConfirm, isPendingConfirm);

        // commit changes
        editor.apply();

        Log.d(TAG, "User Registeration pending"+isPendingConfirm);
    }

    public boolean isLoggedIn(){
       return pref.getBoolean(KEY_IS_LOGGEDIN, false);
    }

    public boolean isPendingConfirm(){
       return pref.getBoolean(KEY_isPendingConfirm, false);
    }
}
