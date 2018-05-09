package com.midburnmobileapp;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.wonday.pdf.RCTPdfView;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
            new SplashScreenReactPackage(),
            new RNDeviceInfo(),
            new RNFetchBlobPackage(),
            new RCTPdfView()
    );
  }

    @Nullable
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}