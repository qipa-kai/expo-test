Setup
=============
## Prequisites

1. Download Nodejs and npm: 

  - (^npm@6.1.0 node@10.7.0)

    https://nodejs.org/download/release/v10.7.0/

2. Download Expo XDE (For simulate OTC app) 

  - Expo XDE

    https://docs.expo.io/versions/latest/introduction/installation

    (Download mobile app as well)

## Project Setup

Install node modules

```bash
$ cd ~/projects/
$ npm install -g create-react-native-app
$ npm install
$ # OR
$ yarn install
```

Open Expo XDE and open otc-app from existing projects

## Android setup

> Reference: https://docs.expo.io/versions/latest/workflow/android-studio-emulator.html

1. Download Android studio https://developer.android.com/studio/ and install

2. Export android path in bash

```bash
$ echo 'export ANDROID_SDK=~/Android/Sdk' >> ~/.bashrc
$ echo 'export PATH=$PATH:$ANDROID_SDK/tools/bin/:$ANDROID_SDK/platform-tools/' >> ~/.bashrc
$ # OR
$ echo 'export ANDROID_SDK=~/Android/Sdk' >> ~/.zshrc
$ echo 'export PATH=$PATH:$ANDROID_SDK/tools/bin/:$ANDROID_SDK/platform-tools/' >> ~/.zshrc
```

3. Install exp

```bash
$ sudo npm install -g exp
$ exp path
```

4. Create virtual device for android

  1. In Android Studio, go to Tools -> Android -> AVD Manager. (Guide: https://developer.android.com/studio/run/managing-avds)
  
  2. Press the "+ Create Virtual Device" button.
  
  3. Choose the type of hardware you'd like to emulate. We recommend testing against a variety of devices, but if you're unsure where to start, the newest device in the Pixel line could be a good choice.
  
  4. Select an OS version to load on the emulator (probably one of the system images in the "Recommended" tab), and download the image.
  
  5. Change any other settings you'd like, and press "Finish" to create the virtual device. You can now run this device anytime by pressing the Play button in the AVD Manager window.

## Running App

### Android 

To open the app in the Android emulator, first boot it up

Open AVD Manager from Android Studio. In Android Studio, go to Tools -> Android -> AVD Manager. (Guide: https://developer.android.com/studio/run/managing-avds)

Start the virtual machine by pressing play button.

Open Expo XDE and open otc-app from existing projects

Then press Device and Open on Android.


## Suggestions for Android Emulator

  - Use KVM

    1. Install kvm
    
    ```bash
    sudo apt-get install qemu-kvm libvirt-bin virtinst bridge-utils cpu-checker
    ```

    2. Add yourself to the group
    
    ```bash
    $ sudo adduser $USER libvirt
    $ sudo adduser $USER libvirt-qemu
    ```

    3. Logout and login again
    
    4. Always use x86 images (32-bit images), because they run faster than x86_64 images and obviously more faster than arm images
  
  - Use Real Android device


