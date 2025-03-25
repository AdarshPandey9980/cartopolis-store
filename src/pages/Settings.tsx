
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, Monitor, Languages, Moon, Sun, Eye, EyeOff, Save, RotateCw } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    appearance: {
      theme: "system",
      fontSize: 16,
      reducedMotion: false,
      reducedTransparency: false,
    },
    accessibility: {
      contrastMode: "normal",
      keyboardNavigation: true,
      screenReader: false,
      reduceAnimations: false,
    },
    language: "english",
    privacy: {
      cookieConsent: true,
      dataCollection: true,
      marketing: false,
      analytics: true,
    }
  });
  
  // Handle theme change
  const handleThemeChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: value
      }
    }));
  };
  
  // Handle font size change
  const handleFontSizeChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        fontSize: value[0]
      }
    }));
  };
  
  // Handle toggle switches
  const handleToggle = (section: keyof typeof settings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };
  
  // Handle language change
  const handleLanguageChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      language: value
    }));
  };
  
  // Handle contrast mode change
  const handleContrastChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        contrastMode: value
      }
    }));
  };
  
  // Save settings
  const saveSettings = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been successfully updated.",
      });
    }, 1000);
  };
  
  // Reset to defaults
  const resetToDefaults = () => {
    setSettings({
      appearance: {
        theme: "system",
        fontSize: 16,
        reducedMotion: false,
        reducedTransparency: false,
      },
      accessibility: {
        contrastMode: "normal",
        keyboardNavigation: true,
        screenReader: false,
        reduceAnimations: false,
      },
      language: "english",
      privacy: {
        cookieConsent: true,
        dataCollection: true,
        marketing: false,
        analytics: true,
      }
    });
    
    toast({
      title: "Settings reset",
      description: "Your preferences have been reset to default values.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your shopping experience to suit your preferences
          </p>
        </div>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="appearance" className="text-center">
              <Palette className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="text-center">
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Accessibility</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="text-center">
              <Languages className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Language</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-center">
              <EyeOff className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how Cartopolis looks for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Preference</Label>
                    <RadioGroup 
                      value={settings.appearance.theme} 
                      onValueChange={handleThemeChange}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="cursor-pointer flex items-center">
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="cursor-pointer flex items-center">
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system" className="cursor-pointer flex items-center">
                          <Monitor className="h-4 w-4 mr-2" />
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Font Size: {settings.appearance.fontSize}px</Label>
                    </div>
                    <Slider 
                      defaultValue={[settings.appearance.fontSize]} 
                      max={24} 
                      min={12} 
                      step={1}
                      onValueChange={handleFontSizeChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Smaller</span>
                      <span>Default</span>
                      <span>Larger</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reduced-motion">Reduce Motion</Label>
                        <p className="text-sm text-muted-foreground">
                          Minimize animations and transitions
                        </p>
                      </div>
                      <Switch 
                        id="reduced-motion"
                        checked={settings.appearance.reducedMotion}
                        onCheckedChange={() => handleToggle('appearance', 'reducedMotion')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reduced-transparency">Reduce Transparency</Label>
                        <p className="text-sm text-muted-foreground">
                          Decrease background blur and transparency effects
                        </p>
                      </div>
                      <Switch 
                        id="reduced-transparency"
                        checked={settings.appearance.reducedTransparency}
                        onCheckedChange={() => handleToggle('appearance', 'reducedTransparency')}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetToDefaults}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Accessibility Settings */}
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>
                  Configure options to make Cartopolis more accessible for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Contrast Mode</Label>
                    <RadioGroup 
                      value={settings.accessibility.contrastMode} 
                      onValueChange={handleContrastChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="contrast-normal" />
                        <Label htmlFor="contrast-normal" className="cursor-pointer">
                          Normal contrast
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="contrast-high" />
                        <Label htmlFor="contrast-high" className="cursor-pointer">
                          High contrast
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="keyboard-navigation">Enhanced Keyboard Navigation</Label>
                        <p className="text-sm text-muted-foreground">
                          Improved focus indicators and keyboard shortcuts
                        </p>
                      </div>
                      <Switch 
                        id="keyboard-navigation"
                        checked={settings.accessibility.keyboardNavigation}
                        onCheckedChange={() => handleToggle('accessibility', 'keyboardNavigation')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
                        <p className="text-sm text-muted-foreground">
                          Improve compatibility with screen readers
                        </p>
                      </div>
                      <Switch 
                        id="screen-reader"
                        checked={settings.accessibility.screenReader}
                        onCheckedChange={() => handleToggle('accessibility', 'screenReader')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reduce-animations">Reduce Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Minimize animation effects throughout the site
                        </p>
                      </div>
                      <Switch 
                        id="reduce-animations"
                        checked={settings.accessibility.reduceAnimations}
                        onCheckedChange={() => handleToggle('accessibility', 'reduceAnimations')}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetToDefaults}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Language Settings */}
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>
                  Choose your preferred language for the Cartopolis interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Language</Label>
                    <Select value={settings.language} onValueChange={handleLanguageChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Español</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                        <SelectItem value="german">Deutsch</SelectItem>
                        <SelectItem value="italian">Italiano</SelectItem>
                        <SelectItem value="portuguese">Português</SelectItem>
                        <SelectItem value="japanese">日本語</SelectItem>
                        <SelectItem value="chinese">中文</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-2">
                      Changing the language will update all text across the Cartopolis site.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetToDefaults}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage how your data is collected and used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cookie-consent">Cookie Consent</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow essential cookies for site functionality
                      </p>
                    </div>
                    <Switch 
                      id="cookie-consent"
                      checked={settings.privacy.cookieConsent}
                      onCheckedChange={() => handleToggle('privacy', 'cookieConsent')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow collection of usage data to improve services
                      </p>
                    </div>
                    <Switch 
                      id="data-collection"
                      checked={settings.privacy.dataCollection}
                      onCheckedChange={() => handleToggle('privacy', 'dataCollection')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive personalized marketing and promotional emails
                      </p>
                    </div>
                    <Switch 
                      id="marketing"
                      checked={settings.privacy.marketing}
                      onCheckedChange={() => handleToggle('privacy', 'marketing')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Analytics Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow cookies for analytics and site improvements
                      </p>
                    </div>
                    <Switch 
                      id="analytics"
                      checked={settings.privacy.analytics}
                      onCheckedChange={() => handleToggle('privacy', 'analytics')}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-2">Your Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You can request a copy of your personal data or request deletion at any time.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline">Download My Data</Button>
                    <Button variant="destructive">Request Data Deletion</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetToDefaults}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
