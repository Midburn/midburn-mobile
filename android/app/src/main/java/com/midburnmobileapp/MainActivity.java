package com.midburnmobileapp;
import org.devio.rn.splashscreen.SplashScreen;

import android.app.Activity;
import android.os.Bundle;

//public class MainActivity extends ReactActivity {
//
//    /**
//     * Returns the name of the main component registered from JavaScript.
//     * This is used to schedule rendering of the component.
//     */
//    @Override
//    protected String getMainComponentName() {
//        return "MidburnMobileApp";
//    }
//}


import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
    }
}