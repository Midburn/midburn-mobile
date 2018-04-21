package com.midburnmobileapp;
import org.devio.rn.splashscreen.SplashScreen;

import android.os.Bundle;



import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
    }
}