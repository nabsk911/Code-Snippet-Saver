import { LuType, LuFileText, LuTags, LuCode } from "react-icons/lu";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languageIcons, AllLanguages } from "../../utils/utils";

const CreateUpdateInput = ({
  onSubmit,
  open,
  onOpenChange,
  initialData = {},
  modalTitle,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
    code: "",
    language: "",
  });

  // Effect to reset form data when modal opens
  useEffect(() => {
    if (open) {
      setFormData({
        id: initialData.id || "",
        title: initialData.title || "",
        description: initialData.description || "",
        tags: initialData.tags
          ? initialData.tags.map((tag) => tag.tag).join(", ")
          : "",
        code: initialData.code || "",
        language: initialData.language || "",
      });
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagList = formData.tags.split(",").map((tag) => ({
      tag: tag.trim(),
    }));
    onSubmit({ ...formData, tags: tagList });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, language: value });
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black/50 z-50 ${
        open ? "block" : "hidden"
      }`}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-background border border-border w-full rounded-lg p-6 max-w-xl h-max"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold">{modalTitle}</h2>
          {/* Title Input */}
          <div className="flex gap-3 items-center">
            <LuType className="h-5 w-5 text-muted-foreground" />
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="flex gap-3 items-start">
            <LuFileText className="h-5 w-5 text-muted-foreground mt-3" />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Tags Input */}
          <div className="flex gap-3 items-center">
            <LuTags className="h-5 w-5 text-muted-foreground" />
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              required
            />
          </div>

          {/* Relative container for Select and Textarea */}
          <div className="relative">
            {/* Select Language */}
            <Select
              value={formData.language}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="absolute top-1 z-20 w-max border-none left-8 ">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>

              <SelectContent className="max-h-56">
                {AllLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    <div className="flex items-center gap-2">
                      {languageIcons[lang]}
                      <span>{lang}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Code Input */}
            <div className="flex gap-3 items-start">
              <LuCode className="h-5 w-5 text-muted-foreground mt-3" />
              <div className="relative w-full">
                {/* Adjust overlay positioning */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-background border border-border z-10 pointer-events-none rounded-t-lg" />

                <Textarea
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Code"
                  required
                  rows={12}
                  className="w-full font-mono font-medium pt-16 resize-none border rounded-md relative"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="submit" variant="default">
              {submitButtonText}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdateInput;
