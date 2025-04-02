
import React from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareToSocialMediaProps {
  courseTitle: string;
  className?: string;
}

const ShareToSocialMedia: React.FC<ShareToSocialMediaProps> = ({
  courseTitle,
  className
}) => {
  const { toast } = useToast();
  const shareableText = `I just completed the "${courseTitle}" course on PocketLearn! #learning #ai #education`;
  const currentUrl = window.location.href;

  const handleShare = (platform: string) => {
    let shareUrl = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareableText)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareableText)}&url=${encodeURIComponent(currentUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareableText)}`;
        break;
      default:
        // Native share API if available
        if (navigator.share) {
          navigator.share({
            title: "Course Completion",
            text: shareableText,
            url: currentUrl,
          })
          .then(() => toast({
            title: "Shared successfully",
            description: "Your achievement has been shared."
          }))
          .catch((error) => console.error("Error sharing:", error));
          return;
        }
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(shareableText + " " + currentUrl);
        toast({
          title: "Copied to clipboard",
          description: "Share link copied to clipboard"
        });
        return;
    }
    
    // Open share dialog in new window
    window.open(shareUrl, "_blank", "width=600,height=400");
    
    toast({
      title: "Sharing to " + platform,
      description: "Opening share dialog"
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="h-4 w-4 mr-2 text-sky-500" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("copy")}>
          <Share2 className="h-4 w-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareToSocialMedia;
