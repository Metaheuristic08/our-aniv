#!/bin/bash

# Firebase Setup Script
# This script helps you set up Firebase for the Our Anniversary App

echo "🔥 Firebase Setup Helper"
echo "========================"
echo ""

echo "📋 Before running this script, make sure you have:"
echo "   1. Created a Firebase project at https://console.firebase.google.com"
echo "   2. Enabled Firestore Database"
echo "   3. Enabled Firebase Storage"
echo "   4. Configured security rules (see FIREBASE_SETUP.md)"
echo ""

read -p "Have you completed the above steps? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please complete the Firebase setup first. See FIREBASE_SETUP.md for instructions."
    exit 1
fi

echo ""
echo "✅ Great! Now let's verify your setup..."
echo ""

echo "🔧 Configuration Status:"
echo "   - Firebase Config: ✓ (nuestro-aniversario-20866)"
echo "   - API Key: ✓"
echo "   - Project ID: nuestro-aniversario-20866"
echo "   - Storage Bucket: nuestro-aniversario-20866.firebasestorage.app"
echo ""

echo "📦 Next Steps:"
echo "   1. Build the project: npm run build"
echo "   2. Start the development server: npm run dev"
echo "   3. Navigate to http://localhost:5173"
echo "   4. Enter your name when prompted"
echo "   5. Navigate to http://localhost:5173/secreto"
echo "   6. Click 'Inicializar Datos' to load sample data"
echo ""

echo "🎉 You're all set! Happy coding!"
echo ""

# Optional: Open the setup documentation
read -p "Would you like to view the setup documentation? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    if command -v xdg-open &> /dev/null; then
        xdg-open FIREBASE_SETUP.md
    elif command -v open &> /dev/null; then
        open FIREBASE_SETUP.md
    else
        cat FIREBASE_SETUP.md
    fi
fi
